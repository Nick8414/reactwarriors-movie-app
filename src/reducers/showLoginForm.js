import initialState from "./initialState";

export const showLoginForm = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_LOGIN_FORM":
      return {
        ...state,
        showLoginForm: !state.showLoginForm,
      };
    default:
      return state;
  }
};
