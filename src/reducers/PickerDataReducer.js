import {
  FB_PICKER_DATA_FETCH_SUCCESS
} from '../actions/types';
	
const INITIAL_STATE = { initial: "state" };

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FB_PICKER_DATA_FETCH_SUCCESS:
			return (action.payload);
		default:
			return INITIAL_STATE;
		}	
	};
