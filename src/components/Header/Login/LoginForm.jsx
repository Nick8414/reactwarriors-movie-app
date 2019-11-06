import React from "react";
import { API_URL, API_KEY_3, fetchApi } from "../../../api/api";
import classNames from "classnames";
import { AppContext } from "../../App";
import AppContextHOC from "../../HOC/AppContextHOC";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    repeatPassword: "",
    submitting: false,
    errors: {},
  };

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null,
      },
    }));
  };

  handleBlur = () => {
    console.log("on blur");
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    }
  };

  validateFields = () => {
    const errors = {};

    if (this.state.username === "") {
      errors.username = "Not empty";
    }
    if (this.state.password === "") {
      errors.password = "Not empty";
    }
    if (this.state.repeatPassword !== this.state.password) {
      errors.repeatPassword = "Repeat password must be equal password";
    }
    return errors;
  };

  onSubmit = async () => {
    try {
      this.setState({
        submitting: true,
      });
      const data = await fetchApi(
        `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
      );
      const result = await fetchApi(
        `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token,
          }),
        }
      );
      const { session_id } = await fetchApi(
        `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            request_token: result.request_token,
          }),
        }
      );
      this.props.updateSessionId(session_id);
      const user = await fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      );

      this.setState(
        {
          submitting: false,
        },
        () => {
          this.props.updateUser(user);
        }
      );
    } catch (error) {
      console.log("error", error);
      this.setState({
        submitting: false,
        errors: {
          base: error.status_message,
        },
      });
    }
  };

  onLogin = e => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    } else {
      this.onSubmit();
    }
  };

  getClassForInput = key => {
    return classNames("form-control", {
      invalid: this.state.errors[key],
    });
  };

  render() {
    const { username, password, errors, submitting } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <div className="form-group">
            <label htmlFor="username">Пользователь</label>
            <input
              type="text"
              className={this.getClassForInput("username")}
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.username && (
              <div className="invalid-feedback"> {errors.username} </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="text"
              className={this.getClassForInput("password")}
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback"> {errors.password} </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Повторить пароль</label>
            <input
              type="text"
              className={this.getClassForInput("repeatPassword")}
              id="password"
              placeholder="Повторить пароль"
              name="repeatPassword"
              value={this.repeatPassword}
              onChange={this.onChange}
            />
            {errors.repeatPassword && (
              <div className="invalid-feedback"> {errors.repeatPassword} </div>
            )}
          </div>
          <button
            type="button"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center"> {errors.base} </div>
          )}
        </form>
      </div>
    );
  }
}

export default AppContextHOC(LoginForm);
