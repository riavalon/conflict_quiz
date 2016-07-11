import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';


class Results extends Component {
	render() {
		const {
			strongest,
			totals
		} = this.props;
		return (
			<div>
				<h1>Your strongest value: {strongest}!!!</h1>
				<pre>
					{JSON.stringify(totals, null, 2)}
				</pre>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		totals: state.totals.totals,
		strongest: state.totals.strongest
	}
};
const mapDispatchToProps = (dispatch) => {return {}};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Results);
