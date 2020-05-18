import { combineReducers } from "redux";
import { auth } from "./auth";
import { showLoginForm } from "./showLoginForm";
//import counter from './counter'

export default combineReducers({
  auth,
  showLoginForm,

  //counter
});
