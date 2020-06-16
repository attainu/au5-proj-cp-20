import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import appReducerFunction from "./Reducers/appReducer";

const rootReducer = combineReducers({
  raiseIt: appReducerFunction,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
