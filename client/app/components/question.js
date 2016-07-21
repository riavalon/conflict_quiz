import React, {Component} from 'react';


export class Question extends Component {
	constructor(props) {
		super(props);

		this.displayErrors = this.displayErrors.bind(this);
	}

	componentDidMount() {
		const {first} = this.props;

		if (first) {
			this.refs.firstInput.focus();
		}
	}

	displayErrors() {
		const {error} = this.props;
		if (error) {
			return (
				<div class="errors">
					<span style={{color: 'red'}} class="error"><strong>{error}</strong></span>
				</div>
			);
		}
	}

	render() {
		const {question} = this.props;
		const {question_num: qnum} = question;

		const error = this.displayErrors();
		return (
			<div>
				<h3 class="h3 mt3 mb1">Question {qnum}</h3>
				<div class="form-group">
					<label>
						<input
							type="radio"
							ref="firstInput"
							value="a"
							name={`question${qnum}`}
						/> {question.a}
					</label>
				</div>

				<div class="form-group">
					<label>
						<input
							type="radio"
							value="b"
							name={`question${qnum}`}
						/> {question.b}
					</label>
				</div>

				{error}
			</div>
		);
	}
}
