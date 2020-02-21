import { createStore, applyMiddleware } from "redux";

import RootReducer from "./reducers";
import { thunk } from "./middlewares";

export default createStore(RootReducer, applyMiddleware(thunk));
