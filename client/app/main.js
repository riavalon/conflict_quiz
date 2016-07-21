import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose, createStore, combineReducers, applyMiddleware} from 'redux';
import reducers from './reducers';
import {Route, Router, hashHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import createLogger from 'redux-logger';

import RootContainer from './containers/Root';
import Quiz from './containers/quiz/Quiz';
import Results from './containers/results/Results';


const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
	const logger = createLogger({
		level: 'info',
		collapsed: true,
	});
	middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);
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
