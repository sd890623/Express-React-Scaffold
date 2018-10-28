import React, { Component } from 'react';
import { ControlLabel, FormControl, Button } from 'react-bootstrap';
import bindAll from 'lodash/bindAll';
import * as api from '../../utils/api';
import { JSON_TYPE } from '../../utils/api'

export default class SalesByState extends Component {
	constructor(props) {
		super(props);
		this.state = {
			state: 'VIC',
    	result: 0
		};
    bindAll(this, ['submit']);
    this.stateList = ['VIC', 'NSW', 'WA', 'SA'];
	}

  submit() {
    api.get(`findTotalSalesByState?state=${this.state.state}`, JSON_TYPE)
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
				<ControlLabel>Find total sales reported by stores in a state (for example VIC)</ControlLabel>
				<FormControl
					componentClass="select"
					placeholder="select"
					onChange={e => this.setState({
            state: e.target.value
          })}
					value={this.state.state}
				>
					{this.stateList.map((state, iterator) => (
						<option key={iterator} value={state}>{state}</option>
          ))};
				</FormControl>
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
