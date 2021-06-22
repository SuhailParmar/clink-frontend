import React from 'react';
import { View, Text } from 'react-native';
// import GoogleLogin from 'react-google-login';
import setupTokenRefresh from '../../utils/setupTokenRefresh';
import { setId } from '../../utils/http';
import * as clientId from '../../clientId';

const LoginScreen = props => {

  // const clientIdComposed = `${clientId}.apps.googleusercontent.com`;

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
    <View>
      <Text>
        Sign in
      </Text>
      {/* <GoogleLogin
        clientId={clientIdComposed}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      /> */}
    </View>
  )
}

export default LoginScreen;