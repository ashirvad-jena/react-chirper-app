import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddTweet } from "../actions/tweets";
import { Redirect } from "react-router-dom";

class NewTweet extends Component {
	constructor(props) {
		super();
		this.state = {
			text: "",
			toHome: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (e) => {
		const text = e.target.value;
		this.setState({
			text,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { text } = this.state;
		const { dispatch, id } = this.props;
		console.log("New Tweet: ", text, id);
		dispatch(handleAddTweet(text, id));
		this.setState(() => ({
			text: "",
			toHome: id ? false : true,
		}));
	};

	render() {
		const { text, toHome } = this.state;
		if (toHome) {
			return <Redirect to="/" />;
		}

		const tweetLeft = 280 - text.length;
		return (
			<div>
				<h3 className="center">Compose New Tweet</h3>
				<form className="new-tweet" onSubmit={this.handleSubmit}>
					<textarea
						placeholder="What's happening"
						value={text}
						className="textarea"
						onChange={this.handleChange}
						maxLength={280}
					/>
					{tweetLeft <= 100 && (
						<div className="tweet-length">{tweetLeft}</div>
					)}
					<button
						className="btn"
						type="submit"
						disabled={text === ""}
					>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default connect()(NewTweet);
