import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {clearAnswers} from '../../actions';

import {
  HeaderComponent,
  ArticleComponent,
} from '../../components';

class Results extends Component {
	constructor(props) {
		super(props);

		this.getTypes = this.getTypes.bind(this);
	}

	getTypes() {
		const totals = this.props.totals.totals;
		const keys = Object.keys(totals);
		return keys.map((key, idx) => {
			return (
				<li key={idx}>
					{key}: {totals[key]}
				</li>
			);
		});
	}

	render() {
		const {strongest} = this.props.totals;
		const typeList = this.getTypes()
		return (
			<div>
				<Link to="/">Home</Link>

        <HeaderComponent strongest={strongest} />

				<div class="row my2">
          <ArticleComponent />
				</div>

				<hr />

				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<h3 class="text-center my2">Your Totals</h3>
					</div>
				</div>

				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<ul class="list">
							{typeList}
						</ul>
					</div>
				</div>

				<hr />

				<div class="row">
					<div class="col-sm-10 col-sm-offset-1 text-center">
						<h3>Want to retake the quiz?</h3>
						<button class="btn btn-info btn-lg">
							Quiz Me!
						</button>
					</div>
				</div>

			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		totals: state.totals
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(clearAnswers, dispatch);
};

Results = connect(
	mapStateToProps,
	mapDispatchToProps
)(Results);

export default Results;
