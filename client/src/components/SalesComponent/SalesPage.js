import React, { PureComponent } from 'react';
import { ControlLabel, FormControl, Button } from 'react-bootstrap';
import './SalesComponent.scss'
import SalesByStore from './SalesByStore';
import SalesByState from './SalesByState';


export default class SalesPage extends PureComponent {
	render(){
		return (
			<div className="sales-page">
				<div className="row">
					<div className="col-sm-6">
						<SalesByStore />
					</div>
					<div className="col-sm-6">
						<SalesByState />
					</div>
				</div>
			</div>
		);
	}
}