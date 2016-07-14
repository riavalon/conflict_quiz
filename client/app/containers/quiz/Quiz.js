import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, hashHistory} from 'react-router';

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
				<Link to="/">Home</Link>
				<h2 class="mb2">Choose which statement applies to you most!</h2>
				<hr />
				<QuestionGroup
					questions={current}
					handleSubmit={this.handleSubmit}
				/>
			</div>
		);
	}

	handleSubmit(answerList) {
		const idx = answerList.length - 1;
		const finalAnswer = answerList[idx];


		if (finalAnswer && Object.keys(finalAnswer)[0] === '45') {
			this.props.addAnswers(answerList);
			const {answers} = this.props;
			this.props.calculateTotals(answers);
			hashHistory.push('/results');
		} else {
			this.props.addAnswers(answerList);
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
		questions: state.questions,
		answers: state.answers
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
