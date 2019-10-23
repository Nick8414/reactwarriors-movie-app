import React from "react";
import Login from "./Login/Login";
import User from "./User";

//PorpTypes - доделать

class Header extends React.Component {
  render() {
    const { user, updateSessionId, logOff } = this.props;
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
            <User logOff={logOff} />
          ) : (
            <Login updateSessionId={updateSessionId} />
          )}
        </div>
      </nav>
    );
  }
}

export default Header;
