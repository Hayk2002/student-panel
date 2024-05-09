import { combineReducers } from "redux";

import auth from "./auth";
import users from "./users"
import applicants from "./applicants";

const reducers = combineReducers({
    auth,
    users,
    applicants
});

export default reducers;
