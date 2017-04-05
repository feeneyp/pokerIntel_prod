import { START, STOP, RESET, TICK } from './types';


export const onStart = () => {
	      console.log('START CALLED IN STOPWATCH ACTIONS');
	return {
		type: START,
		running: true,
		previousTime: Date.now(),
	};
};

export const onStop = () => {
	return {
		type: STOP,
		running: false,
	};
};

export const onReset = () => {
	return {
		type: RESET,
		elapsedTime: 0,
		previousTime: Date.now(),
	};
};

export const tick = ({ elapsedTime, previousTime }) => {
	return {
		type: TICK,
		elapsedTime,
		previousTime
	};
};
