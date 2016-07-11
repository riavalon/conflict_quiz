import React, {Component} from 'react';
import {Link} from 'react-router';

import {Question} from './question';


export class QuestionGroup extends Component {
	constructor(props) {
		super(props);

		this.getQuestions = this.getQuestions.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	getQuestions() {
		const {questions} = this.props;
		return questions.map(question => {
			return (
				<Question
					key={question.question_num}
					question={question}
				/>
			);
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const {questions, handleSubmit} = this.props;
		const answers = [];
		const form = e.target;

		questions.forEach((question) => {
			const question_num = question.question_num;
			const answer = {
				[question_num]: form[`question${question_num}`].value
			};
			answers.push(answer);
		});

		handleSubmit(answers);
	}

	render() {
		const questions = this.getQuestions();
		const {final} = this.props;
		const buttonText = final ? 'Submit' : 'Next';
		return (
			<div>
				<h1>Question group</h1>
				<form onSubmit={this.onSubmit}>
					{questions}

					<button type="submit" class="btn btn-success btn-lg">
						{buttonText}
					</button>
				</form>
			</div>
		);
	}
}
