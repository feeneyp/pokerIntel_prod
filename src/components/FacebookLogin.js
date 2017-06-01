import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import FBSDK from 'react-native-fbsdk';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { facebookLoginUserSuccess } from '../actions';
import { Actions } from 'react-native-router-flux';

const { LoginButton, AccessToken } = FBSDK;
      
class FacebookLogin extends Component {
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
                AccessToken.getCurrentAccessToken()
                .then(function(data) {
                  var credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken.toString());
                  firebase.auth().signInWithCredential(credential)
                .then(function(user) {
                  console.log("Sign In Success", user);
                  }, 
                  function(error) {
                    console.log("Sign In Error", error);
                  });
                this.props.facebookLoginUserSuccess(user);
                console.log("Login was successful with permissions: " + result.grantedPermissions)
                })
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