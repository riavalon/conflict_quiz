export const NEW_TOTALS = 'NEW_TOTALS';


export const addNewTotals = totals => {
	return {
		type: NEW_TOTALS,
		payload: totals
	};
};
