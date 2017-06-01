import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  EMAIL_LOGIN_USER_SUCCESS,
  EMAIL_LOGIN_USER_FAIL,
  EMAIL_LOGIN_USER,
  EMAIL_LOGOUT_USER,
  FACEBOOK_LOGIN_USER_SUCCESS,
  FACEBOOK_LOGIN_USER_FAIL
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const emailLoginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: EMAIL_LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => emailLoginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => createNewUserInFB(user))
          .then(user => emailLoginUserSuccess(dispatch, user))
          .catch(() => emailLoginUserFail(dispatch,error));
      });
  };
};

const emailLoginUserFail = (dispatch,error) => {
  dispatch({ 
    type: EMAIL_LOGIN_USER_FAIL,
    payload: error
  });
};

const emailLoginUserSuccess = (dispatch, user) => {
  dispatch({
    type: EMAIL_LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.main();
};


const createNewUserInFB = (user) => {
  console.log ('user in createNewUserInFB is :' + JSON.stringify(user));
    firebase.database().ref(`/players/${user.uid}/profile_data`)
      .push({ display_name: 'display name', email: user.email })
}; 


export const emailLogoutUser = () => {
  return (dispatch) => {
    console.log('emailLogoutUser is being executed');
    firebase.auth().signOut().then(function(dispatch) {
      dispatch({type: EMAIL_LOGOUT_USER});
    })
    .catch(function(error) {
      console.log('logging error in emailLogoutUser: ' + error)
    });
    Actions.auth();
  };
}

export const facebookLoginUserSuccess = (user) => {
  return(dispatch) => {
    dispatch({
      type: FACEBOOK_LOGIN_USER_SUCCESS,
      payload: user
    });
    Actions.main();
    console.log("facebookLoginUserSuccess called as action in fblogin.js");
  };
};

// const facebookLoginUserFail = (dispatch) => {
//   dispatch({ type: FACEBOOK_LOGIN_USER_FAIL });
// };

