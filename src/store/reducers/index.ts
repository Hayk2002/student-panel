import { combineReducers } from "redux";

import auth from "./auth"
import applicants from "./applicants";

const reducers = combineReducers({
    auth,
    applicants
});

export default reducers;
