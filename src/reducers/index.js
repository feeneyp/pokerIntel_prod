import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GameFormReducer from './GameFormReducer';
//import PickerDataReducer from './PickerDataReducer';
import GameReducer from './GameReducer';

export default combineReducers({
  auth: AuthReducer,
  gameForm: GameFormReducer,
  //pickerData: PickerDataReducer,
  games: GameReducer,
});
