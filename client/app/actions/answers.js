export const ADD_ANSWERS = 'ADD_ANSWERS';
export const CLEAR_ANSWERS = 'CLEAR_ANSWERS';


export const addAnswers = answers => {
	return {
		type: ADD_ANSWERS,
		payload: answers
	};
};

export const clearAnswers = () => {
	return {
		type: CLEAR_ANSWERS,
	};
};
