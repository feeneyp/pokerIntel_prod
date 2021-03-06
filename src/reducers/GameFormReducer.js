import {
  TIMER_DISPLAYED,
  START, STOP, RESET, TICK,
  GAME_UPDATE,
  GAME_CREATED,
  GAME_SAVE_SUCCESS,
  FB_PICKER_DATA_FETCH_SUCCESS
  } from '../actions/types';
var moment = require('moment');

const INITIAL_STATE = {
  running: false,
  previouseTime: 0,
  elapsedTime: 0,
  timerIsInView: false,
  stake: '',
  gameType: '',
  location: '',
  limitType: '',
  buyIn: '',
  note: '',
  tips: '',
  startDate: moment('2000-01-01').format('ll'),
  startTime: moment('2000-01-01').format('LT'),
  endDate: moment('2000-01-01').format('ll'),
  endTime: moment('2000-01-01').format('LT'),
  startEndISOFormat: {
      startDate: { year: 2000, month: 0, day: 0 },
      startTime: { hour: 0, minute: 0 },
      endDate: { year: 2000, month: 0, day: 0 },
      endTime: { hour: 0, minute: 0 }
    },
  gameDuration: '',
  cashOut: '',
  pickerData: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIMER_DISPLAYED:
      return { ...state, timerIsInView: action.timerIsInView };
    case START:
      return { ...state, running: action.running, previousTime: action.previousTime, startDate: action.startDate, startTime: action.startTime };
    case STOP:
      return { ...state, running: action.running, endDate: action.endDate, endTime: action.endTime, gameDuration: action.gameDuration };
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
    case FB_PICKER_DATA_FETCH_SUCCESS:
      return { ...state, pickerData: action.payload };
    default:
      return state;
  }
};


