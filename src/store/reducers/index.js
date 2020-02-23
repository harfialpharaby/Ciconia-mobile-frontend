import { combineReducers } from "redux";

import user from "./userReducer";
import travels from "./travelReducer";
import items from "./itemReducer";
import carts from "./cartReducer";

export default combineReducers({ user, travels, items, carts });
