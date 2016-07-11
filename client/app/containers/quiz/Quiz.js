import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hashHistory} from 'react-router';

import {
	getQuestionsAsync,
	addAnswers,
	calculateTotals,
} from '../../actions';

import {Question} from '../../components/question';
import {QuestionGroup} from '../../components/question-group';



class Quiz extends Component {
	constructor(props) {
		super(props);
		const pointer = 0;

		this.state = {
			pointer: pointer,
			answers: [],
			final: false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this._getQuestionSet = this._getQuestionSet.bind(this);
	}

	componentDidMount() {
		this.setState({
			current: this._getQuestionSet()
		});

		if (this.props.questions.length === 0) {
			this.props.getQuestions();
		}
	}

	render() {
		const current = this._getQuestionSet();
		return (
			<div>
				<h2 class="mb2">Choose which statement applies to you most!</h2>
				<hr />
				<QuestionGroup
					questions={current}
					handleSubmit={this.handleSubmit}
				/>
			</div>
		);
	}

	handleSubmit(answers) {
		const idx = answers.length - 1;
		const finalAnswer = answers[idx];


		if (finalAnswer && Object.keys(finalAnswer)[0] === '45') {
			this.props.addAnswers(answers);
			const {answers, calculateTotals} = this.props;
			calculateTotals(answers);
			hashHistory.push('/results');
		} else {
			this.props.addAnswers(answers);
			const newPointer = this.state.pointer + 9;
			this.setState({
				pointer: newPointer,
			});
		}

	}

	_getQuestionSet() {
		const {questions} = this.props;
		const {pointer} = this.state;

		const start = pointer;
		const end = pointer + 9;
		if (start === 45) { return []; }

		return questions.slice(start, end)
	}
}

const mapStateToProps = state => {
	return {
		questions: state.questions
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		getQuestions: getQuestionsAsync,
		addAnswers,
		calculateTotals,
	}, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Quiz);
