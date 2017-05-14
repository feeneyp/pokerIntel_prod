import React, { Component } from 'react';
import { View } from 'react-native';
import FBSDK from 'react-native-fbsdk';
const { LoginButton } = FBSDK;
      
export class FBLogin extends Component {
  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                console.log("Login was cancelled");
              } else {
                console.log("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => console.log("User logged out")}/>
      </View>
    );
  };
};


export default FBLogin;