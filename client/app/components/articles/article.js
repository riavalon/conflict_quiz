import React, {Component} from 'react';

import {Persuade} from './persuade';
import {Support} from './support';
import {AvoidAccommodate} from './avoid_accommodate';
import {Compel} from './compel';
import {Negotiate} from './negotiate';
import {Collaborate} from './collaborate';


export class ArticleComponent extends Component {
	constructor(props) {
		super(props);

		this.styleInfo = this.styleInfo.bind(this);
	}

	styleInfo(strength) {
		switch (strength) {
			case 'persuade':
				return <Persuade />;
			case 'avoid_accommodate':
				return <AvoidAccommodate />;
			case 'compel':
				return <Compel />;
			case 'support':
				return <Support />;
			case 'negotiate':
				return <Negotiate />;
			case 'collaborate':
				return <Collaborate />;
			default:
				return <Persuade />;
		}
	}

	render() {
		const {strength} = this.props;
		const article = this.styleInfo(strength);
		return (
			<div class="row">
				<div class="col-xs-10 col-xs-offset-1">
					{article}
				</div>
			</div>
		);
	}
};
