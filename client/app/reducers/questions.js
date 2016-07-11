import {
	GET_QUESTIONS
} from '../actions';


const questions = (state = [], action) => {
	switch (action.type) {
		case GET_QUESTIONS:
			return action.payload
		default:
			return state;
	}
};

export default questions;
