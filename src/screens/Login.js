import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
// import GoogleLogin from 'react-google-login';
import { setId, getUser } from '../utils/http';
import setupTokenRefresh from '../utils/setupTokenRefresh';
import * as clientId from '../clientId';
import Screen from '../components/Screen.js';
import Button from '../components/Button.js';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 10
  }
});

const LoginScreen = ({ navigation, route, login, updateUserContext }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const clientIdComposed = `${clientId}.apps.googleusercontent.com`;

  // todo combine
  useEffect(() => {
    if(!isLoggedIn) return;
    const getUser_ = async () => {
      try {
        const user = await getUser('2'); // todo remove hard-coding when login is implemented; local storage equiv?
        updateUserContext(user);
        if(true) navigation.navigate('Home'); // todo
      } catch (e) {
        console.error(e); // todo will need to retry and/or display error message
      }
    };
    getUser_();
  }, [isLoggedIn]);

  useEffect(() => {
    const getLoggedIn = () => {
      setTimeout(() => {
        setLoading(false);
        setIsLoggedIn(false);
        login(false);
      }, 3000);
    }
    getLoggedIn();
  }, []);

  const onLogin = () => {
    navigation.navigate('Home');
    setIsLoggedIn(true);
    login(true);
    // todo get user
  }

  const clearCache = () => {

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
        ? <Text>Loading...</Text>
        : <>
            <Text>
              Log in
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Log in" styleButton={styles.button} onPress={onLogin} />
              <Button title="Sign up" styleButton={styles.button} onPress={() => navigation.navigate('SignUp')} />
              {/* todo temporary */}
              <Button title="Clear cached login" styleButton={styles.button} onPress={clearCache} />
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
