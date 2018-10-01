import React from 'react';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory } from 'react-router';

import UserLayout from './components/Layout';

import HomePage from './components/HomePage';
import SalesPage from './components/SalesComponent/SalesPage';
import StorePage from './components/StoreComponent/StorePage';

const AppRouter = () => (
	<Router history={browserHistory}>
		<Route path="/" component={UserLayout} >
			<IndexRoute component={HomePage} />
			<Route path="total-sales" component={SalesPage} />
			<Route path="find-a-store" component={StorePage} />
		</Route>
	</Router>
);

export default AppRouter;