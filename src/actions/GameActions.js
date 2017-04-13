import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
var moment = require('moment');
import {
  GAME_UPDATE,
  GAME_CREATED,
  GAMES_FETCH_SUCCESS,
  GAME_SAVE_SUCCESS
} from './types';
import { START, STOP, RESET, TICK } from './types';


export const onStart = () => {
  return {
    type: START,
    running: true,
    previousTime: Date.now(),
    startDate: moment().format('ll'),
    startTime: moment().format('LT')
  };
};

export const onStop = (elapsedTime) => {
  return {
    type: STOP,
    running: false,
    gameCompleted: true,
    endDate: moment().format('ll'),
    endTime: moment().format('LT'),
    gameDuration: Math.round(elapsedTime / (60*60*1000) * 10) / 10.0
  };
};

export const onReset = () => {
  return {
    type: RESET,
    elapsedTime: 0,
    previousTime: Date.now(),
    gameCompleted: true
  };
};

export const tick = ({ elapsedTime, previousTime }) => {
  return {
    type: TICK,
    elapsedTime,
    previousTime
  };
};

export const createNewGameInFB = ({ elapsedTime, stake, gameType, location, limitType, buyIn, note, tips,
    startDate, startTime, endDate, endTime, startEndISOFormat, gameDuration, cashOut }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    console.log('gameCreate returns - new session about to be pushed with gameDuration: ' + gameDuration);
    console.log('startDate is: '+startDate);
    firebase.database().ref(`/users/${currentUser.uid}/games`)
      .push({ elapsedTime, stake, gameType, location, limitType, buyIn, note, tips, 
          startDate, startTime, endDate, endTime, startEndISOFormat, gameDuration, cashOut })
      .then(() => {
        dispatch({ type: GAME_CREATED });
        Actions.gameList();
      });
  };
};

export const gameSave = ({ elapsedTime, stake, gameType, location, limitType, buyIn, note, tips, 
    startDate, startTime, endDate, endTime, startEndISOFormat, gameDuration, cashOut, uid }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    console.log('gameSave returns - new emp about to updated with: ' + stake + gameType + location);
    firebase.database().ref(`/users/${currentUser.uid}/games/${uid}`)
      .set({ elapsedTime, stake, gameType, location, limitType, buyIn, note, tips,
          startDate, startTime, endDate, endTime, startEndISOFormat, gameDuration, cashOut })
      .then(() => {
        dispatch({ type: GAME_SAVE_SUCCESS });
        Actions.gameList();
      });
  };
};


export const gameUpdate = ({ prop, value }) => {
	return ({
		type: GAME_UPDATE,
		payload: { prop, value }
		});
};


export const gameDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();
  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/games/${uid}`)
      .remove()
      .then(() => Actions.gameList({ type: 'reset' })
      ); 
    };
  };


export const gamesFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    console.log('GameActions about to do a fb snapshot');
    firebase.database().ref(`/users/${currentUser.uid}/games`)
      .on('value', snapshot => {
      dispatch({ type: GAMES_FETCH_SUCCESS, payload: snapshot.val() });
    console.log('snapshot.val is : ' + JSON.stringify(snapshot.val()));
      }); 
    };
};
