import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveTweets } from "./tweets";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

// Example of usage of thunk, action creator returns function instead of object
const AUTHED_ID = "tylermcginnis";
export const handleInitialData = () => (dispatch) => {
	dispatch(showLoading());
	return getInitialData().then(({ users, tweets }) => {
		dispatch(receiveUsers(users));
		dispatch(receiveTweets(tweets));
		dispatch(setAuthedUser(AUTHED_ID));
		dispatch(hideLoading());
	});
};
