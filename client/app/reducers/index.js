import { combineReducers } from 'redux';

import answers from './answers';
import totals from './totals';
import questions from './questions';


const rootReducer = combineReducers({
	answers,
	totals,
	questions,
});

export default rootReducer;
