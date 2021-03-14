import authedUser from "./authedUser";
import users from "./users";
import tweets from "./tweets";
import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
	authedUser,
	users,
	tweets,
	loadingBar: loadingBarReducer,
});
