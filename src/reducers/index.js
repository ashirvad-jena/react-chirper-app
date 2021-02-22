import { authedUser } from "./authedUser";
import { users } from "./users";
import { tweets } from "./tweets";
import { combineReducers } from "redux";

export default combineReducers({
	authedUser,
	users,
	tweets,
});
