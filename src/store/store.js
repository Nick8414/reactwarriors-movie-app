import { createStore } from "redux";
import reducerApp from "../reducers/index.js";

const store = createStore(reducerApp);

export default store;
