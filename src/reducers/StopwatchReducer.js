import { START, STOP, RESET, TICK } from '../actions/types';

const INITIAL_STATE = {
    running: false,
    previouseTime: 0,
    elapsedTime: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START:
      console.log('START CALLED IN STOPWATCH REDUCER');
      return { ...state, running: action.running, previousTime: action.previousTime };
    case STOP:
      return { ...state, running: action.running };
    case RESET:
      return { ...state, elapsedTime: action.elapsedTime, previousTime: action.previousTime };
    case TICK:
      return { ...state, elapsedTime: action.elapsedTime, previousTime: action.previousTime };
	default:
      return state;
  }
};
