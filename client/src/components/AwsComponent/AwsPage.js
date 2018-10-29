import React, { Component } from 'react';
import { ControlLabel, FormControl, Button } from 'react-bootstrap';
import * as api from '../../utils/api';
import { JSON_TYPE } from '../../utils/api'
import bindAll from 'lodash/bindAll';
import './AwsComponent.scss'

export default class AwsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
    	status: 'Off'
		};
    bindAll(this, ['startServer', 'stopServer', 'findStatus']);
	}

	componentDidMount() {
    this.intervalHandler = window.setInterval(this.findStatus, 10000);
    this.findStatus();
	}

  componentWillUnmount() {
    clearInterval(this.intervalHandler);
  }

	startServer() {
			this.setState({ loading: true });
	    api.get('startServer', JSON_TYPE)
	      .then((response) => {
          this.setState({
            loading: false
          });
          this.findStatus();
	        if (response.error_msg) {
	          console.warn(response.error_msg);
	        }
	        return null;
	      })
	      .catch((error) => {
	        console.warn(error);
          this.setState({
            loading: false
          });
	      });
	}

  stopServer() {
    this.setState({ loading: true });
    api.get('stopServer', JSON_TYPE)
      .then((response) => {
        this.setState({
          loading: false
        });
        this.findStatus();
        if (response.error_msg) {
          console.warn(response.error_msg);
        }
        return null;
      })
      .catch((error) => {
        console.warn(error);
        this.setState({
          loading: false
        });
      });
  }

  findStatus() {
    api.get('serverStatus', JSON_TYPE)
      .then((response) => {
        this.setState({
          status: response.status
        });
        if (response.error_msg) {
          console.warn(response.error_msg);
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
					<h3>{this.state.status}</h3>
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
