import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import UserMenu from "./UserMenu";

class User extends React.Component {
  render() {
    const { user, logOff } = this.props;
    return (
      <div>
        <UserMenu user={user} />
        <button className="btn btn-success " onClick={logOff}>
          Logoff
        </button>
      </div>
    );
  }
}

export default AppContextHOC(User);
