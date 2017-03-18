import React from 'react';
import { Link } from 'react-router';

export default class MongoDB extends React.Component {
	render(){
		return (
			<div className="container">
				<h1 className="page-header">Node-React-Scaffholding</h1>
				<div className="container">
					<p className="lead">MongoDB</p>
					<p>MongoDB is the document based database. It stores JSON object in the form of BSON.</p>
				</div>
			</div>
		);
	}
}