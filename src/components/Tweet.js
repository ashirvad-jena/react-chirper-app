import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";
import {
	TiArrowBackOutline,
	TiHeartOutline,
	TiHeartFullOutline,
} from "react-icons/ti/index";
import { handleToggleTweet } from "../actions/tweets";
import { Link, withRouter } from "react-router-dom";

class Tweet extends Component {
	toParent = (e, parentId) => {
		e.preventDefault();
		this.props.history.push(`/tweet/${id}`);
	};

	handleLike = (e) => {
		e.preventDefault();
		const { dispatch, tweet, authedUser } = this.props;
		dispatch(
			handleToggleTweet({
				id: tweet.id,
				hasLiked: tweet.hasLiked,
				authedUser,
			})
		);
	};

	render() {
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
			<Link to={`/tweet/${id}`} className="tweet">
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
							onClick={this.handleLike}
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
			</Link>
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

export default withRouter(connect(mapStateToProps)(Tweet));
