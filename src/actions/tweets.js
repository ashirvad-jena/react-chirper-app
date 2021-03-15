import { hideLoading, showLoading } from "react-redux-loading";
import { saveLikeToggle, saveTweet } from "../utils/api";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "TOGGLE_TWEET";
export const ADD_TWEET = "ADD_TWEET";

export const receiveTweets = (tweets) => {
	return {
		type: RECEIVE_TWEETS,
		tweets,
	};
};

const toggleTweet = ({ id, authedUser, hasLiked }) => {
	return {
		type: TOGGLE_TWEET,
		id,
		authedUser,
		hasLiked,
	};
};

const addTweet = (tweet) => {
	return {
		type: ADD_TWEET,
		tweet,
	};
};

export const handleToggleTweet = (info) => {
	return (dispatch) => {
		dispatch(toggleTweet(info));
		saveLikeToggle(info).catch((e) => {
			console.warn("Error in handleToggleTweet: ", e);
			dispatch(toggleTweet(info));
			alert("There was an error liking the tweet. Try again");
		});
	};
};

export const handleAddTweet = (text, replyingTo) => {
	return (dispatch, getState) => {
		const { authedUser } = getState();
		dispatch(showLoading);
		console.log(text);
		return saveTweet({
			text,
			author: authedUser,
			replyingTo,
		})
			.then((tweet) => dispatch(addTweet(tweet)))
			.then(() => dispatch(hideLoading));
	};
};
