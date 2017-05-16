import React, { Component } from 'react';
import { View } from 'react-native';
import FBSDK from 'react-native-fbsdk';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { facebookLoginUserSuccess } from '../actions';
import { Actions } from 'react-native-router-flux';

const { LoginButton } = FBSDK;
      
class FBLogin extends Component {
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
                this.props.facebookLoginUserSuccess();
                console.log("Login was successful with permissions: " + result.grantedPermissions)
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

export default connect(mapStateToProps, { facebookLoginUserSuccess })(FBLogin);