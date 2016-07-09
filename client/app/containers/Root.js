import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';


class RootContainer extends Component {
	render() {
		axios.get('/api/questions')
		.then(response => console.log(response));
		return (
			<div>
				<h1 class="title text-center">
					Conflicting Quiz Time!
				</h1>

				<div class="row">
					<div class="col-xs-10 col-xs-offset-1">
						<p class="introduction my2">
						Sit nisi dolorem placeat cupiditate natus. Obcaecati ea eveniet dicta magni sed quisquam. Molestiae architecto dolores possimus fugiat similique! Tenetur magnam odio minima similique dolores a quas. Consectetur laborum impedit. Lorem consectetur tempore maiores praesentium id alias unde sit? Voluptates velit dolorem quasi vitae ipsa. Quaerat optio minima nihil consequatur quod placeat. Error odio velit dolorum eos ad? Obcaecati molestias.
						</p>
					</div>

					<div class="col-xs-12 text-center">
						<Link to="/quiz" class="btn btn-info btn-lg">
							Get Started!
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default RootContainer;
