import axios from 'axios';


export const NEW_TOTALS = 'NEW_TOTALS';

export function calculateTotals(answers) {
	return (dispatch) => {
		axios.post('/api/quiz', {answers})
		.then(response => {
			const data = response.data;
			dispatch({
				type: NEW_TOTALS,
				payload: {
					totals: data['totals'],
					strongest: data['strongest']
				}
			});
		});
	};
}
