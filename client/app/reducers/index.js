import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import answers from './answers';
import totals from './totals';
import questions from './questions';


const rootReducer = combineReducers({
	answers,
	totals,
	questions,
	routing: routerReducer,
});

export default rootReducer;
