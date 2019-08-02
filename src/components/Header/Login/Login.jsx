import React from 'react';
import {API_URL, API_KEY_3} from '../../../api/api';

export default class Login extends React.Component {

  sendPromises = () => {

    const getRequestToken = () => {
      return new Promise((resolve, reject) => {
        fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
          .then(response => {
            if (response.status < 400) {
              return response.json()
            } else {
              throw response;
            }
            
          })
          .then(data => {
            console.log(data);
          })
          .catch(errpr => {
            console.log('error', error);
          })
          
          })
      }
      getRequestToken();
   

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
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.sendPromises}
        >
          Login
        </button>
      </div>
    )
  }
}