import React from 'react';

export default class ReleaseYear extends React.Component {
  render() {
    let options = [];
    for (let i = 1883; i<=2019; i++) {
      options.push({label:i, value:i});
    }

    const {onChangeFilters, primary_release_year} = this.props; 
    return (
      <div className="form-group">
        <label htmlFor="primary_release_year">Год выпуска:</label>
        <select 
          name="primary_release_year" 
          id="primary_release_year"
          className="form-control"
          value={primary_release_year}
          onChange={onChangeFilters}
        >
          {options.map(option => 
            (
              <option key={option.value} value={option.value}>{option.label}</option>
            )
          )}
        </select>
      </div>
    )
  }
}