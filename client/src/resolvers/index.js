import { combineReducers } from "redux";
import { authResolver } from "./authResolver";

export const rootReducer = combineReducers({
  auth: authResolver,
  // Add your reducers here
});
