import { combineReducers } from "redux";

import auth from "./authReducer";
import artists from "./artistsReducer";

export default combineReducers({ auth, artists });