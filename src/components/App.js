import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		return (
			<div>
				Starter Code
				{this.props.isLoading ? null : <Dashboard />}
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
