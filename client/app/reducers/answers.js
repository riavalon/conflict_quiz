import {
	ADD_ANSWERS,
	CLEAR_ANSWERS
} from '../actions';

const answers = (state = [], action) => {
	switch (action.type) {
		case ADD_ANSWERS:
			return [
				...state,
				...action.payload
			];
		case CLEAR_ANSWERS:
			return [];
		default:
			return state;
	}
};

export default answers;
