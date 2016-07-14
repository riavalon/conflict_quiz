import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {clearAnswers} from '../../actions';

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

				<div class="row mb2">
					<div class="col-sm-10 col-sm-offset-1">
						<h2 class="text-center">Your Results</h2>
					</div>
				</div>

				<div class="row my2">
					<div class="col-sm-10 col-sm-offset-1">
						<h1 class="strongest-type caps">{strongest}</h1>
					</div>
				</div>

				<div class="row my2">
					<div class="col-sm-4 col-sm-offset-1">
						<button class="btn btn-lg btn-block btn-success">
							Download
						</button>
					</div>
					<div class="col-sm-6">
						<h4 class="">Download the details of your results as a PDF</h4>
					</div>
				</div>

				<div class="row my2">
					<article class="col-sm-10 col-sm-offset-1">
						<h1>The Persuasion Style</h1>

						<p class="my1">
							Adipisicing dolor enim porro unde unde. Corporis eum esse aut saepe voluptatum. Facere omnis aut ab architecto placeat blanditiis. Nihil odio corrupti incidunt id placeat libero neque. Reprehenderit perspiciatis libero officiis autem nemo numquam aliquid ipsam ut nostrum, reprehenderit fugit iusto, temporibus? Perspiciatis nobis assumenda ratione reprehenderit cum? Aspernatur rem perspiciatis earum ad quidem dignissimos est. Obcaecati sequi expedita minus sequi itaque nulla veniam. Optio magnam veniam cumque qui in sapiente dolorum blanditiis dolores. Harum exercitationem non blanditiis delectus facere praesentium quis odio quibusdam. Provident praesentium ducimus enim laborum consequuntur consectetur. Quaerat deserunt natus aliquam nobis ducimus! Veniam nemo distinctio!
						</p>

						<h2>Some other title</h2>

						<p class="my1">
							Amet laudantium vel fugiat quis neque porro! Voluptatum esse similique modi aut fuga tempore. Debitis deleniti debitis magnam dolor necessitatibus. Ipsam a reprehenderit eligendi alias dolore autem dolor consequatur? Molestias ad amet cumque ex officia doloremque harum repellat nemo quisquam autem mollitia autem. Eius incidunt velit quibusdam modi qui. Quo quaerat voluptas architecto adipisci labore nihil ab odit. A sint optio expedita quo autem possimus nesciunt cupiditate, saepe consequuntur cupiditate saepe cumque, vitae! Maxime iure amet aliquid veritatis perferendis. Reprehenderit.
						</p>
					</article>
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
