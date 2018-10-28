import React, { Component } from 'react';
import { ControlLabel, FormControl, Button } from 'react-bootstrap';
import bindAll from 'lodash/bindAll';
import './AwsComponent.scss'

export default class AwsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
    	status: ''
		};
    bindAll(this, ['submit']);
	}
	startServer() {
			this.setState({ loading: true });
	    api.get('startServer', JSON_TYPE)
	      .then((response) => {
	        if (response.error_msg) {
	          console.warn(response.error_msg);
	        } else {
	          this.setState({
	            loading: false
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
			<div className="aws-page">
				<div className="row">
					<Button onClick={this.startServer} bsStyle="primary" disabled={this.state.loading}>
						Start my server
					</Button>
					<Button onClick={this.stopServer} bsStyle="primary" disabled={this.state.loading}>
						Stop my server
					</Button>
				</div>
			</div>
		);
	}
}
