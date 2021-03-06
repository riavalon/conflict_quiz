import React, {Component} from 'react';


export class Collaborate extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div class="about-type">
					<h1 class="caps bold mb1">Collaborating</h1>

					<p>Collaboration means that you work together with the people with whom you disagree. You might call Collaboration "joint problem solving" or "mutual problem solving" because that is the essence of what a collaborative strategy is.</p>
				</div>
				<hr />
				<div class="when-to-use">
					<h2 class="caps bold mb1">When to use Collaboration</h2>

					<p>Choose collaborative strategies in situations where you and the others involved are willing to play by the collaborative rules; that is all parties involed in the conflict must be willing and able to acknowledge that there is a problem, to share all the information each individual or group has about the problem, and to stick with a problem-solving process.</p>

					<p>Collaboration should be used when the stakes are high and the costs of not collaborating greatly exceed the costs of directly confronting the issues and trying to work them through with people whom you initially disagree.</p>

					<p>Collaboration takes time, so there has to be enough time available to use this method.</p>
				</div>
			</div>
		);
	}
}
