import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GameFormReducer from './GameFormReducer';
import GameReducer from './GameReducer';
import StopwatchReducer from './StopwatchReducer';

export default combineReducers({
  auth: AuthReducer,
  gameForm: GameFormReducer,
  games: GameReducer,
  stopwatch: StopwatchReducer
});
