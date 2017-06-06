import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import FBSDK from 'react-native-fbsdk';
import { connect } from 'react-redux';
import { facebookLoginUserSuccess } from '../actions';
//import { Actions } from 'react-native-router-flux';

const { LoginButton, AccessToken } = FBSDK;
      
class FacebookLogin extends Component {

  facebookLoginSuccess(user) {
    this.props.facebookLoginUserSuccess(user);
  }

  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              console.log('this at top: '+ this);
              if (error) {
                console.log("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                console.log("Login was cancelled");
              } else {
                AccessToken.getCurrentAccessToken()
                .then(data => {
                  var credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken.toString());
                  firebase.auth().signInWithCredential(credential)
                .then(user => {
                  console.log("Sign In Success", user);
                  console.log("Login was successful with permissions: " + result.grantedPermissions);
                  console.log('this in .then :' + this)
                  this.facebookLoginSuccess(user);
                  }, 
                  function(error) {
                    console.log("Sign In Error", error);
                  });
                });
              }
            }
          }
          onLogoutFinished={() => console.log("User logged out")}/>
      </View>
    );
  };
};


const mapStateToProps = ({ auth }) => {
  const { error, loading } = auth;
  return {error, loading };
};

export default connect(mapStateToProps, { facebookLoginUserSuccess })(FacebookLogin);