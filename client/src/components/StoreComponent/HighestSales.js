import React, { Component } from 'react';
import { ControlLabel, Button } from 'react-bootstrap';
import bindAll from 'lodash/bindAll';
import * as api from '../../utils/api';
import { JSON_TYPE } from '../../utils/api'

export default class HighestSales extends Component {
	constructor(props) {
		super(props);
		this.state = {
    	result: ''
		};
    bindAll(this, ['submit']);
	}

  submit() {
    api.get('findStoreHighSales', JSON_TYPE)
      .then((response) => {
        if (response.error_msg) {
          console.warn(response.error_msg);
        } else {
          this.setState({
            result: response.store.centre
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
				<ControlLabel>Click to find out the centre where we took the most sales</ControlLabel>
				<Button
					onClick={this.submit}
				>
					Submit
				</Button>
				<p>{this.state.result !== '' ? `The store is ${this.state.result}` : 'No record found'}</p>
			</div>
		);
	}
}