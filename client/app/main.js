import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import {Route, Router, browserHistory} from 'react-router';

import RootContainer from './containers/Root';
import Quiz from './containers/quiz/Quiz';


const store = createStore(
	reducers,
	applyMiddleware(thunk));

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={RootContainer} />

			<Route path="/quiz" component={Quiz} />
			{/* <Route path="/results" component={Results} /> */}
		</Router>
	</Provider>,
	document.getElementById('render-node')
);
