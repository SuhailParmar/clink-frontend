import React from 'react';
// import GoogleLogout from 'react-google-login';

const LogoutScreen = props => {

  // const clientId = "658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com";

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <View>
      <Text>
        Sign in
      </Text>
      {/* <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      /> */}
    </View>
  )
}

export default LogoutScreen;