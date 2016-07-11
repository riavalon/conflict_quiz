import axios from 'axios';


export const GET_QUESTIONS = 'GET_QUESTIONS';

export function getQuestionsAsync() {
	return dispatch => {
		axios.get('/api/questions')
		.then(response => {
			console.log(dispatch);
			dispatch({
				type: GET_QUESTIONS,
				payload: response.data
			});
		});
	};
}
