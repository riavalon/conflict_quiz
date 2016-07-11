import React, {Component} from 'react';


export class Question extends Component {
	render() {
		const {question} = this.props;
		const {question_num: qnum} = question;
		return (
			<div>
				<h3 class="h3 mt3 mb1">Question {qnum}</h3>
				<div class="form-group">
					<label>
						<input
							type="radio"
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
			</div>
		);
	}
}
