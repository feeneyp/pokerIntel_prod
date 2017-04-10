import { START, STOP, RESET, TICK } from '../actions/types';
import {
  GAME_UPDATE,
  GAME_CREATED,
  GAME_SAVE_SUCCESS
} from '../actions/types';
var moment = require('moment');

const INITIAL_STATE = {
  running: false,
  previouseTime: 0,
  elapsedTime: 0,
  gameCompleted: false,
  stake: '',
  gameType: '',
  location: '',
  limitType: '',
  buyIn: '',
  note: '',
  tips: '',
  startDate: moment().format('ll'),
  startTime: moment().format('LT'),
  endDate: moment().format('ll'),
  endTime: moment().format('LT'),
  cashOut: '' 

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START:
      return { ...state, running: action.running, previousTime: action.previousTime, startDate: moment().format('ll'), startTime: moment().format('LT')};
    case STOP:
      return { ...state, running: action.running, gameCompleted: action.gameCompleted, endDate: moment().format('ll'), endTime: moment().format('LT')};
    case RESET:
      return { ...state, elapsedTime: action.elapsedTime, previousTime: action.previousTime };
    case TICK:
      return { ...state, elapsedTime: action.elapsedTime, previousTime: action.previousTime };
    case GAME_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case GAME_CREATED:
      return INITIAL_STATE;
    case GAME_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
