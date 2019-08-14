import React from 'react'

export default class User extends React.Component {
  render() {
    const {user, logOff} = this.props;
    return(
      <div>
          <img 
            width="40"
            className="rounded-circle mr-2"
            src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`} alt=""/>
          <button
            className="btn btn-success "
            onClick={logOff}
          >
            Logoff
          </button>
      </div>
    )
  }
}
