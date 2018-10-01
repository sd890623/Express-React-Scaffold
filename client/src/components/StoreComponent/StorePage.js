import React, { PureComponent } from 'react';
import HighestSales from './HighestSales';
import HighestPSM from './HighestPSM';
import './StoreComponent.scss';

export default class StorePage extends PureComponent {
  render(){
    return (
			<div className="store-page">
				<div className="row">
					<div className="col-sm-6 high-sales">
						<HighestSales />
					</div>
					<div className="col-sm-6 high-psm">
						<HighestPSM />
					</div>
				</div>
			</div>
    );
  }
}