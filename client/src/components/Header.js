import React, { Component } from 'react';
import { Link } from 'react-router';
import { ButtonGroup, Button } from 'react-bootstrap';
import * as api from '../utils/api';
import { JSON_TYPE } from '../utils/api'

export default class Header extends Component {

	constructor(props){
		super(props);
		this.state = { heading: '' };
	}

	componentWillMount(){
    api.get('hello', JSON_TYPE)
      .then((response) => {
        if (response.error_msg) {
          console.warn(response.error_msg);
        } else {
          this.setState({
            heading: response.msg
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
			<div className="header container">
				<div className="row">
					<h1 className="col-sm-6 col-sm-offset-3 well well-lg text-center">
						{this.state.heading}
					</h1>
				</div>
				<ButtonGroup vertical>
					<Link to="/total-sales">
						<button className="btn btn-default btn-sm">Find more about total sales</button>
					</Link>
					<Link to="/find-a-store">
						<button className="btn btn-default btn-sm">Find more about a specific store</button>
					</Link>
          <Link to="/aws">
            <button className="btn btn-default btn-sm">Control aws service</button>
          </Link>
					<Link to="/">
						<button className="btn btn-default btn-sm">Go back home</button>
					</Link>
				</ButtonGroup>
			</div>
		)
	}
}

