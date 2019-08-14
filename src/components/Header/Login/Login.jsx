import React from 'react';

import {Modal, ModalBody } from 'reactstrap';
import LoginForm from './LoginForm';

export default class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      showLoginForm: false
    };
  }

  toggleLoginForm = () => {
    this.setState(prevState => ({
      showLoginForm: !prevState.showLoginForm
    }))
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
        <Modal
          isOpen={this.state.showLoginForm}
          toggle={this.toggleLoginForm}
        >
          <ModalBody >
            <LoginForm
              updateUser={this.props.updateUser}
              updateSessionId={this.props.updateSessionId}
            />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}