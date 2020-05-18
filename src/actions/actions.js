export const actionCreatorUpdateAuth = (payload) => {
  return {
    type: "UPDATE_AUTH",
    payload,
  };
};

export const actionCreatorLogOut = () => {
  return {
    type: "LOGOUT",
  };
};

export const actionCreatorToggleLoginForm = () => {
  return {
    type: "TOGGLE_LOGIN_FORM",
  };
};
