import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import reducers from './reducers';
import {Route, Router, hashHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import createLogger from 'redux-logger';

import RootContainer from './containers/Root';
import Quiz from './containers/quiz/Quiz';
import Results from './containers/results/Results';


const logger = createLogger();
const store = createStore(
	reducers,
	applyMiddleware(thunk, logger));

const history = syncHistoryWithStore(hashHistory, store);

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={RootContainer} />

			<Route path="/quiz" component={Quiz} />
			<Route path="/results" component={Results} />
		</Router>
	</Provider>,
	document.getElementById('render-node')
);
