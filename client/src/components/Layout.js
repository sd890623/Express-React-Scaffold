import React, { PureComponent } from 'react';

import { Provider } from 'react-redux';
import configureStore from '../config/store.config';

import Header from './Header';
import '../style.scss';

export default class UserLayout extends PureComponent {
  render(){
    return (
			<Provider store={configureStore({ initialState: {} })}>
				<div id="vicinity-app" className="container-fluid">
					<Header />
					<div className="body container">
          	{this.props.children}
					</div>
				</div>
			</Provider>
    );
  }
}