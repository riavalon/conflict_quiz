import React, {Component} from 'react';
import {Link} from 'react-router';

import {Question} from './question';


export class QuestionGroup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: [],
		};

		this.getQuestions = this.getQuestions.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.displayErrorMessage = this.displayErrorMessage.bind(this);
	}

	getQuestions() {
		const {questions} = this.props;
		const {errors} = this.state;
		return questions.map((question, idx) => {
			let error = null;
			const first = !!(idx === 0);
			if (errors.length) {
				error = errors.reduce((prev, curr) => {
					const qnum = question.question_num;
					return curr.qnum === qnum ? curr.message : prev;
				}, null);
			}
			return (
				<Question
					key={question.question_num}
					question={question}
					error={error}
					first={first}
				/>
			);
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const {questions, handleSubmit} = this.props;
		const answers = [];
		const form = e.target;
		let errors = [];

		questions.forEach((question) => {
			const question_num = question.question_num;
			const value = form[`question${question_num}`].value;
			if (!value) {
				errors.push({
					message: 'You must answer this question',
					qnum: question_num
				});
			}
			const answer = {
				[question_num]: form[`question${question_num}`].value
			};
			answers.push(answer);
		});

		if (errors.length) {
			return this.setState({errors});
		} else {
			return handleSubmit(answers);
		}

	}

	displayErrorMessage() {
		const {errors} = this.state;
		if (errors.length) {
			return (
				<p style={{color: 'red'}} class="my1">Please answer all questions marked above.</p>
			);
		}
	}

	render() {
		const questions = this.getQuestions();
		const {final} = this.props;
		const buttonText = final ? 'Submit' : 'Next';
		const error = this.displayErrorMessage();
		return (
			<div>
				<h1>Question group</h1>
				<form onSubmit={this.onSubmit}>
					{questions}

					<button type="submit" class="btn btn-success btn-lg">
						{buttonText}
					</button>
				</form>
				{error}
			</div>
		);
	}
}
