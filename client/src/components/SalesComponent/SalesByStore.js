import React, { Component } from 'react';
import { ControlLabel, FormControl, Button } from 'react-bootstrap';
import bindAll from 'lodash/bindAll';
import * as api from '../../utils/api';
import { JSON_TYPE } from '../../utils/api'

export default class SalesByStore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storeName: 'Chadstone',
    	result: 0
		};
    bindAll(this, ['submit']);
	}

  submit() {
		const param = { store: this.state.storeName };
    api.get(`findTotalSalesByCenter?center=${this.state.storeName}`, JSON_TYPE)
      .then((response) => {
        if (response.error_msg) {
          console.warn(response.error_msg);
        } else {
          this.setState({
            result: response.sales
          });
        }
        return null;
      })
      .catch((error) => {
        console.warn(error);
      });
	}

	render(){
		return (
			<div>
				<ControlLabel>Find total sales reported by a store. (example: Chadstone)</ControlLabel>
				<FormControl
					type="text"
					value={this.state.storeName}
					placeholder="Enter text"
					onChange={e => this.setState({ storeName: e.target.value })}
				/>
				<Button
					onClick={this.submit}
				>
					Submit
				</Button>
				<p>{this.state.result ? `The sales is ${this.state.result}` : 'No record found'}</p>
			</div>
		);
	}
}