import React from 'react';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory } from 'react-router';

import UserLayout from './components/Layout';

import HomePage from './components/HomePage';
import FirstPage from './components/FirstPage/FirstPage';

const AppRouter = () => (
	<Router history={browserHistory}>
		<Route path="/" component={UserLayout} >
			<IndexRoute component={HomePage} />
			<Route path="first" component={FirstPage} />
		</Route>
	</Router>
);

export default AppRouter;
