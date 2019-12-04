import React from "react";
import Cookies from "universal-cookie";

import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";

const cookies = new Cookies();
export default class Login extends React.Component {
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
    console.log("Login componentn did mount");
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
