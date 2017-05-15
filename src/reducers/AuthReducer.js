import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  EMAIL_LOGIN_USER_SUCCESS,
  EMAIL_LOGIN_USER_FAIL,
  EMAIL_LOGIN_USER,
  FACEBOOK_LOGIN_USER_SUCCESS,
  FACEBOOK_LOGIN_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case EMAIL_LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case EMAIL_LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case EMAIL_LOGIN_USER_FAIL:
      return { ...state, error: 'Email/password authentication Failed.', password: '', loading: false };
    case FACEBOOK_LOGIN_USER_SUCCESS:
      return {...state, ...INITIAL_STATE, user: action.payload };
    case FACEBOOK_LOGIN_USER_FAIL:
      return { ...state, error: 'Facebook login Failed.', password: '', loading: false };
    default:
      return state;
  }
};
