import {NEW_TOTALS} from '../actions';

const IState = {
	totals: {
		'persuade': 0,
		'support': 0,
		'collaborate': 0,
		'avoid/accommodate': 0,
		'negotiate': 0,
		'compel': 0,
	},

	strongest: '',
};


const totals = function(state = IState, action) {
	switch (action.type) {
		case NEW_TOTALS:
			return action.payload;
		default:
			return state;
	}

	return state;
};

export default totals;
