import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default  class UISelect extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.value !== this.props.value) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const {id, labelText, name, value, onChange, children} = this.props;
      return (
        <div className="form-group" >
          <label htmlFor="{id}">{labelText}</label>
          <select 
            name={name}
            id={id}
            className="form-control"
            value={value}
            onChange={onChange}
          >
            {children}
          </select>
        </div> 
      )
  } 
}
