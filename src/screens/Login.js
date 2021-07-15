import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setId, getUser } from '../utils/http';
import setupTokenRefresh from '../utils/setupTokenRefresh';
import clientId, {
  expoClientId,
  webClientId,
  iosClientId,
  androidClientId,
} from '../clientId';
import elements from '../theming/elements';
import Screen from '../components/Screen.js';
import Button from '../components/Button.js';
import * as WebBrowser from 'expo-web-browser';
// Tried expo-google-app-auth, expo-google-sign-in, react-google-login
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession(); // WEB: Makes Google auth pop-up window return properly

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 10
  },
  input: elements.input
});

const USER_KEY = '@user-id';

const LoginScreen = ({ navigation, route, login, updateUserContext }) => {
  const [loading, setLoading] = useState(true);
  const [loginInputText, setLoginInputText] = useState(2);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({ // useAuthRequest
    // expoClientId,
    webClientId,
    iosClientId,
    androidClientId,
    // scopes: ['profile', 'email', 'openid']
  });

  useEffect(() => {
    (async () => {
      if (response?.type === 'success') {
        // setupTokenRefresh(response.authentication.refreshToken)
        onLogin(response.params.id_token);
      }
    })();
  }, [response]);

  const getUser_ = async () => {
    try {
      const { data } = await getUser();
      updateUserContext(data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  //#region Storage management
  const tryGetUserIdFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem(USER_KEY);
      console.log('Got', value);
      return value;
    } catch(e) {
      console.error(e);
    }
  }
  
  const saveUserIdToStorage = async (value) => {
    try {
      await AsyncStorage.setItem(USER_KEY, value)
      console.log('Saved', value);
    } catch (e) {
      console.error(e);
    }
  }

  const removeUserIdFromStorage = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY)
      console.log('Cleared', USER_KEY);
    } catch(e) {
      console.error(e);
    }
  }
  //#endregion

  // on load, check if user is already logged in
  useEffect(() => {
    const checkIsLoggedIn = () => {
      setTimeout(async () => {
        const userId = await tryGetUserIdFromStorage(USER_KEY);
        if (userId) {
          onLogin(userId, true);
        } else setLoading(false);
      }, 500);
    }
    checkIsLoggedIn();
  }, []);

  const onLogin = async (id, idFoundInStorage = false) => {
    setId(id);
    // ensure UserContext is set up
    let user;
    if (idFoundInStorage) {
      user = await getUser_();
    } else {
      const [_, userResponse] = await Promise.all([
        saveUserIdToStorage(id),
        getUser_()
      ]);
      user = userResponse;
    }
    if (!user) {
      console.log('Failed to fetch user details. Preventing login...'); // todo report on screen
      return; //don't log in
    }
    // no need to navigate, App.js will take care of that for us
    login();
  }

  return (
    <Screen>
      {loading
        ? <>
          <Text>Loading...</Text>
          <Button title="Clear cached login" styleButton={styles.button} onPress={removeUserIdFromStorage} /> 
          </>
        : <>
            <Text>
              Log in
            </Text>
            <TextInput 
              // onChangeText={}
              value={loginInputText}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              {/* <Button title="Log in" styleButton={styles.button} onPress={() => onLogin(loginInputText)} /> */}
              <Button title="Google Sign up" styleButton={styles.button} onPress={() => navigation.navigate('Sign Up')} />
              <Button title="Google Sign in" styleButton={styles.button} disabled={!request} onPress={promptAsync} />
            </View>
          </>
      }
    </Screen>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  route: PropTypes.any.isRequired,
  login: PropTypes.func.isRequired, 
  updateUserContext: PropTypes.func.isRequired,
}

export default LoginScreen;
