import {NEW_TOTALS} from '../actions';


const totals = function(state = {}, action) {
	switch (action.type) {
		case NEW_TOTALS:
			return action.payload;
		default:
			return state;
	}

	return state;
};

export default totals;
