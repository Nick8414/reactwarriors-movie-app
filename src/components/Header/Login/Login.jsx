import React from "react";

import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import AppContextHOC from "../../HOC/AppContextHOC";
import { actionCreatorToggleLoginForm } from "../../../actions/actions";
import { connect } from "react-redux";

class Login extends React.Component {
  render() {
    const { showLoginForm, toggleLoginForm } = this.props;
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleLoginForm}
        >
          Login
        </button>
        <Modal isOpen={showLoginForm} toggle={toggleLoginForm}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

//export default AppContextHOC(Login)

const mapStateToProps = (state) => {
  return {
    showLoginForm: state.showLoginForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoginForm: () => dispatch(actionCreatorToggleLoginForm()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContextHOC(Login));
