import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";
import {
	TiArrowBackOutline,
	TiHeartOutline,
	TiHeartFullOutline,
} from "react-icons/ti/index";

class Tweet extends Component {
	toParent = (e, parentId) => {
		e.preventDefault();
		// TODO: redirect to parent tweet
	};

	handleLike = (e) => {
		e.preventDefault();
		// TODO: toggle like
	};

	render() {
		console.log(this.props);
		const { tweet } = this.props;
		if (tweet === null) {
			return <div>This tweet doesn't exist</div>;
		}
		const {
			name,
			avatar,
			timestamp,
			text,
			hasLiked,
			likes,
			replies,
			id,
			parent,
		} = tweet;

		return (
			<div className="tweet">
				<img
					className="avatar"
					alt={`Avatar of ${avatar}`}
					src={avatar}
				/>
				<div className="tweet-info">
					<div>
						<span>{name}</span>
						<div>{formatDate(timestamp)}</div>
						{parent && (
							<button
								className="replying-to"
								onClick={(e) => this.toParent(e, parent.id)}
							>
								Replying to @{parent.author}
							</button>
						)}
						<p>{text}</p>
					</div>

					<div className="tweet-icons">
						<TiArrowBackOutline className="tweet-icon"></TiArrowBackOutline>
						<span>{replies !== 0 && replies}</span>
						<button
							className="heart-button"
							onClick={(e) => this.handleLike()}
						>
							{hasLiked ? (
								<TiHeartFullOutline
									className="tweet-icon"
									color="#e0245e"
								></TiHeartFullOutline>
							) : (
								<TiHeartOutline className="tweet-icon"></TiHeartOutline>
							)}
						</button>
						<span>{likes !== 0 && likes}</span>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
	const tweet = tweets[id];
	const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
	return {
		authedUser,
		tweet: tweet
			? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
			: null,
	};
};

export default connect(mapStateToProps)(Tweet);
