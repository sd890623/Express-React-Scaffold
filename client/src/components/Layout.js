import React, { PureComponent } from 'react';

import { Provider } from 'react-redux';
import configureStore from '../config/store.config';

import Header from './Header';

export default class UserLayout extends PureComponent {
  render(){
    return (
			<Provider store={configureStore({ initialState: {} })}>
				<div id="app-container vicinity-app" className="container-fluid">
					<Header />
          {this.props.children}
				</div>
			</Provider>
    );
  }
}