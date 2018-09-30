
import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './router';
import './index.html';

import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import './style.scss';

ReactDOM.render(
	<AppRouter />,
	document.getElementById('root')
);