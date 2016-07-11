import axios from 'axios';


export const NEW_TOTALS = 'NEW_TOTALS';

export function calculateTotals(answers) {
	return (dispatch) => {
    console.clear();
    console.log(answers);
		axios.post('/api/quiz', {answers})
		.then(response => {
			const data = response.data;
			dispatch({
				type: NEW_TOTALS,
				payload: {
					totals: data[0],
					strongest: data[1]
				}
			});
		});
	};
}
