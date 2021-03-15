import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		return (
			<div>
				<LoadingBar />
				{this.props.isLoading ? null : (
					<TweetPage
						match={{
							params: {
								id: "hbsc73kzqi75rg7v1e0i6a",
							},
						}}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = ({ authedUser }) => {
	return {
		isLoading: authedUser === null,
	};
};

export default connect(mapStateToProps)(App);
