import React from "react";

import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import AppContextHOC from "../../HOC/AppContextHOC";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      showLoginForm: false,
    };
  }

  toggleLoginForm = () => {
    this.setState(prevState => ({
      showLoginForm: !prevState.showLoginForm,
    }));
  };

  componentDidMount() {
    const { session_id } = this.props;
    this.setState({ showLoginForm: !session_id });
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.toggleLoginForm}
        >
          Login
        </button>
        <Modal isOpen={this.state.showLoginForm} toggle={this.toggleLoginForm}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AppContextHOC(Login);
