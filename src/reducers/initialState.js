import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  isAuth: false,
  favorites: [],
  watchList: [],
  showLoginForm: false,
};

export default initialState;
