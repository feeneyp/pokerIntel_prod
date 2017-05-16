import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  EMAIL_LOGIN_USER_SUCCESS,
  EMAIL_LOGIN_USER_FAIL,
  EMAIL_LOGIN_USER,
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
          .then(user => emailLoginUserSuccess(dispatch, user))
          .catch(() => emailLoginUserFail(dispatch));
      });
  };
};

const emailLoginUserFail = (dispatch) => {
  dispatch({ type: EMAIL_LOGIN_USER_FAIL });
};

const emailLoginUserSuccess = (dispatch, user) => {
  dispatch({
    type: EMAIL_LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.main();
};


export const facebookLoginUserSuccess = () => {
  return(dispatch) => {
    dispatch({
      type: FACEBOOK_LOGIN_USER_SUCCESS,
      payload: "facebook user"
    });
    Actions.main();
    console.log("facebookLoginUserSuccess called as action in fblogin.js");
  };
};

// const facebookLoginUserFail = (dispatch) => {
//   dispatch({ type: FACEBOOK_LOGIN_USER_FAIL });
// };

