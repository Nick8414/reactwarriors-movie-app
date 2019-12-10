import React, { Component } from "react";
import CallApi from "../../api/api";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import AppContextHOC from "../HOC/AppContextHOC";

class UserMenu extends Component {
  state = {
    dropdownOpen: false,
  };

  toggleDropdown = () => {
    this.setState(prevState => {
      return { dropdownOpen: !prevState.dropdownOpen };
    });
  };

  handleLogOut = () => {
    CallApi.delete("/authentication/session", {
      body: {
        session_id: this.props.session_id,
      },
    }).then(() => {
      this.props.onLogOut();
    });

    // fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
    //   method: "DELETE",
    //   mode: "cors",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     session_id: this.props.session_id,
    //   }),
    // }).then(() => {
    //   this.props.onLogOut();
    // });
  };

  render() {
    const { user } = this.props;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle
          nav
          onClick={this.toggleDropdown}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          <img
            tag="div"
            width="40"
            className="rounded-circle mr-2"
            src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`}
            alt=""
            onClick={this.toggleDropdown}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.handleLogOut}>Выйти</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default AppContextHOC(UserMenu);
