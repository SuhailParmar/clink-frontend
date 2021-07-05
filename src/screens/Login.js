import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import GoogleLogin from 'react-google-login';
import { setId, getUser } from '../utils/http';
import setupTokenRefresh from '../utils/setupTokenRefresh';
import * as clientId from '../clientId';
import elements from '../theming/elements';
import Screen from '../components/Screen.js';
import Button from '../components/Button.js';

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

// todo error handling: retry button and/or display error message
const LoginScreen = ({ navigation, route, login, updateUserContext }) => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [loginInputText, setLoginInputText] = useState(2);

  // const clientIdComposed = `${clientId}.apps.googleusercontent.com`;

  const getUser_ = async (id) => {
    try {
      const user = await getUser(id);
      updateUserContext(user);
    } catch (e) {
      console.error(e); 
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
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(USER_KEY, jsonValue)
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
        if(userId) {
          setUserId(userId);
          onLogin(userId, true);
        } else setLoading(false);
      }, 3000);
    }
    checkIsLoggedIn(); // todo at some point, will need to check for secrets/tokens instead
  }, []);

  const onLogin = async (id, idFoundInStorage = false) => {
    // ensure UserContext is set up
    if(idFoundInStorage) await getUser_(id);
    else {
      await Promise.all([
        saveUserIdToStorage(id),
        getUser_(id)
      ])
    }
    // no need to navigate, App.js will take care of that for us
    login();
  }

  // const onSuccess = (res) => {
  //   console.log('[Login success] current user:', res.profileObj);
  //   console.log('[Login success] res:', res);
  //   setupTokenRefresh(res);
  //   setId(res.googleId);
  // }

  // const onFailure = (res) => {
  //   console.log('[Login failed] res:', res);
  // }

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
              <Button title="Log in" styleButton={styles.button} onPress={() => onLogin(loginInputText)} />
              <Button title="Sign up" styleButton={styles.button} onPress={() => navigation.navigate('Sign Up')} />
            </View>
          </>
      }
      {/* <GoogleLogin
        clientId={clientIdComposed}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      /> */}
    </Screen>
  )
}

LoginScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  route: PropTypes.any.isRequired,
  login: PropTypes.func.isRequired, 
  updateUserContext: PropTypes.func.isRequired,
}

export default LoginScreen;
