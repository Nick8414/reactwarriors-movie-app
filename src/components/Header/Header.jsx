import React from "react";
import Login from "./Login/Login";
import User from "./User";
import UserMenu from "./UserMenu";
import App, { AppContext } from "../App";

//PorpTypes - доделать

class Header extends React.Component {
  render() {
    const { user, logOff } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item-active">
              <a className="nav-link" href="google.com">
                Home
              </a>
            </li>
          </ul>
          {user ? (
            <UserMenu />
          ) : (
            <AppContext.Consumer>
              {context => {
                return <Login session_id={context.session_id} />;
              }}
            </AppContext.Consumer>
          )}
        </div>
      </nav>
    );
  }
}

export default Header;
