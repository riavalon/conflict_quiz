import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// import {clearAnswers} from '../../actions';

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
		const keys = Object.keys(totals).sort();
		return keys.map((key, idx) => {
			return (
				<li key={idx}>
					<span class="caps typekey">{key}:</span> <span class="typetotal">{totals[key]}</span>
				</li>
			);
		});
	}

	render() {
		const {strongest} = this.props.totals;
		const typeList = this.getTypes()
		const filename = strongest.replace('/', '_');
		return (
			<div>
				<Link to="/">Home</Link>

				<HeaderComponent strongest={strongest} />

				<div class="row my2">
					<ArticleComponent strength={filename} />
				</div>

				<div class="row my2">
					<div class="col-xs-8 col-xs-offset-2">
						<h3 class="text-center bold">Download the details of your results as a PDF</h3>
						<a href="/files/type" download>
							<button class="btn btn-lg btn-block btn-success">
								Download
							</button>
						</a>
					</div>
				</div>

				<hr />

				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<h3 class="text-center mb1">Your Totals</h3>
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
					<div class="col-xs-6 col-xs-offset-3 text-center">
						<h3>Want to retake the quiz?</h3>
						<Link to="/quiz" class="btn btn-info btn-block btn-lg">
							Quiz Me!
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		totals: state.totals,
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

Results = connect(
	mapStateToProps,
	mapDispatchToProps
)(Results);

export default Results;
