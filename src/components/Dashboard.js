import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
	render() {
		return (
			<div>
				<h3 className="center">Your Timeline</h3>
				<ul className="dashboard-list">
					{this.props.tweetIds.map((id) => (
						<li key={id}>
							<div>Tweet Id: {id}</div>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = ({ tweets }) => {
	return {
		tweetIds: Object.keys(tweets).sort(
			(a, b) => tweets[a].timestamp - tweets[b].timestamp
		),
	};
};

export default connect(mapStateToProps)(Dashboard);
