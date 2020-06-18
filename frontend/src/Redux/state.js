import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducerFunction from "./Reducers/appReducer";

const rootReducer = combineReducers({
  user: userReducerFunction,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
