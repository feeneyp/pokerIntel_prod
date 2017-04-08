import {
  GAME_UPDATE,
  GAME_CREATED,
  GAME_SAVE_SUCCESS
} from '../actions/types';
var moment = require('moment');

const INITIAL_STATE = {
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
