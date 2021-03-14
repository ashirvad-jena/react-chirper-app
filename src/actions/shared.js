import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveTweets } from "./tweets";
import { setAuthedUser } from "./authedUser";

// Example of thunk, action creator returns function instead of object
const AUTHED_ID = "tylermcginnis";
export const handleInitialData = () => (dispatch) => {
	return getInitialData().then(({ users, tweets }) => {
		dispatch(receiveUsers(users));
		dispatch(receiveTweets(tweets));
		dispatch(setAuthedUser(AUTHED_ID));
	});
};
