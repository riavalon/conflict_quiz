import React, { Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import {getQuestionsAsync} from '../actions';


class RootContainer extends Component {
	constructor(props) {
		super(props);
		this.props.getQuestions();
	}
	render() {
		return (
			<div>
				<h1 class="title text-center">
					The Conflict Inventory
				</h1>

				<hr />

				<div class="row">
					<div class="col-xs-10 col-xs-offset-1">
						<p class="introduction my2">
							As you answer the questions in the inventory, think of yourself in a particular “setting” in which
							you are sometimes or often in conflict. Do not attempt to think of yourself “in general” or in a
							variety of settings, but in one particular environment. A setting is an environment, organization,
							or relationship that has significance for you as distinct from other settings or relationships. For
								example, a setting might be your relationship with your spouse as distinct from your relationship
							from your children; it might be your relationship with your co-workers, or your manager; it might
							be your relationship with a volunteer organization within your community.
						</p>

						<p class="introduction my2">
							For each question, give an answer that reflects, as close as it can, how you usually respond in
								this conflict setting. Each question contains a pair of statements describing possible behaviour
							responses. For each pair, circle the “A” or “B” statement that is most characteristic of your own
								behaviour. In many cases neither “A: or “B” may be very typical of your behaviour; even so,
							please select the response you would be more likely to make. If you skip questions, the scoring
								will not be meaningful.
						</p>
					</div>

					<div class="col-xs-6 col-xs-offset-3 text-center">
						<Link to="/quiz" class="btn btn-block btn-info btn-lg">
							Get Started!
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = function() { return {} };
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getQuestions: getQuestionsAsync
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RootContainer);
