import React from 'react';
import {API_URL, API_KEY_3, fetchApi} from '../../../api/api';
import { tsStringKeyword } from '@babel/types';

export default class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    submitting: false,
    errors: {}
  }

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null
      }
    }));
  };

  handleBlur = () => {
    console.log("on blur")
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }))
    }
  }

  validateFields = () => {
    const errors = {};

    if (this.state.username === "") {
      errors.username = "Not empty";
    }
    return errors;
  }

  onSubmit = async () => {
    

     // const getRequestToken = () => {
    //   return new Promise((resolve, reject) => {
    //     fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //       .then(response => {
    //         if (response.status < 400) {
    //           return response.json()
    //         } else {
    //           throw response;
    //         }
    //       })
    //       .then(data => {
    //         resolve(data);
    //         console.log(data);
    //       })
    //       .catch(response => {
    //         response.json()
    //         .then(error=> {
    //           reject(error);
    //         console.log('error', error);
    //       });
    //       });
    //     });
    //   };

    // const validateWithLogin = (body) => {
    //   return new Promise((resolve, reject) => {
    //     fetch(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, {
    //       method: "POST",
    //       mode: "cors",
    //       headers: {
    //         "Content-type":"application/json"
    //       },
    //       body: JSON.stringify(body)
    //   })
    //       .then(response => {
    //         if (response.status < 400) {
    //           return response.json()
    //         } else {
    //           throw response;
    //         }
    //       })
    //       .then(data => {
    //         resolve(data);
    //         console.log(data);
    //       })
    //       .catch(response => {
    //         response.json()
    //         .then(error=> {
    //           reject(error);
    //         console.log('error', error);
    //       });
    //       });
    //     });
    // }  

      // fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      //   .then(data => {
      //     console.log('success',data)
      //     return fetchApi(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,  {
      //       method: "POST",
      //       mode: "cors",
      //       headers: {
      //         "Content-type":"application/json"
      //       },
      //       body: JSON.stringify({
      //                 username: "nick8414",
      //                 password: "icewind27",
      //                 request_token: data.request_token
      //               })
      //   })
      // })
      // .then(data => {
      //   return fetchApi(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`, { 
      //         method: "POST",
      //         mode: "cors",
      //         headers: {
      //           "Content-type":"application/json"
      //         },
      //         body: JSON.stringify({
      //           request_token: data.request_token
      //         })
      //       })
      // })
      // .then(data => {
      //   console.log('session', data);
      // })
      // .catch(error => {
      //   console.log('error', error)
      // });
   

    // fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     fetch(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, {
    //       method: "POST",
    //       mode: "cors",
    //       headers: {
    //         "Content-type":"application/json"
    //       },
    //       body: JSON.stringify({
    //         username: "nick8414",
    //         password: "icewind27",
    //         request_token: data.request_token
    //       })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data);
    //       fetch(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //       {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //           "Content-type":"application/json"
    //         },
    //         body: JSON.stringify({
    //           username: "nick8414",
    //           password: "icewind27",
    //           request_token: data.request_token
    //         })
    //       })
    //       .then(response => response.json())
    //       .then(data => {
    //         console.log("session", data);
    //       })
    //     })
    //   })



    try {
      this.setState({
        submitting: true
      });
      const data = await fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`);
      const result = await fetchApi(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,  {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type":"application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          request_token: data.request_token
        })
      })
      const {session_id} = await fetchApi(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`, { 
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type":"application/json"
        },
        body: JSON.stringify({
          request_token: result.request_token
        })
      })
      this.props.updateSessionId(session_id);
      const user = await fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`);
      this.props.updateUser(user);
      console.log(user);



      this.setState({
        submitting: false
      });
      // console.log(data);
      // console.log(result);
      // console.log(session_id);
    } catch(error) {
      console.log('error', error);
      this.setState({
        submitting:false,
        errors: {
          base:error.status_message
        }
      })
    }
  };

  onLogin = e => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }))
    } else {
      this.onSubmit();
    }
  }


  render() {
    const { username, password, errors, submitting } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center" >
            Авторизация
          </h1>
          <div className="form-group">
            <label htmlFor="username">Пользователь</label>
            <input 
              type="text"
              className="form-control"
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur = {this.handleBlur}
            />
            {errors.username && (
              <div className="invalid-feedback" > {errors.username} </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input 
              type="text"
              className="form-control"
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback" > {errors.password} </div>
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
            <div className="invalid-feedback text-center" > {errors.base} </div>
          )}
        </form>
      </div>
    )
  }
}