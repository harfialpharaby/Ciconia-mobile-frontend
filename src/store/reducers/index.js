import { combineReducers } from "redux";

import user from "./userReducer";
import travels from "./travelReducer";
import items from "./itemReducer";

export default combineReducers({ user, travels, items });
