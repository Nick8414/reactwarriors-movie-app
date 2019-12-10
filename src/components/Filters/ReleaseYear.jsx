import React from 'react';
import UISelect from '../UIComponents/UISelect';

export default class ReleaseYear extends React.PureComponent {
  render() {
    let options = [];
    for (let i = 1883; i<=2019; i++) {
      options.push({label:i, value:i});
    }

    const {onChangeFilters, primary_release_year} = this.props; 
    return (
      <div className="form-group">
        <UISelect 
          labelText="Год выпуска"
          name="primary_release_year" 
          id="primary_release_year"
          value={primary_release_year}
          onChange={onChangeFilters}
        >
          {options.map(option => 
            (
              <option key={option.value} value={option.value}>{option.label}</option>
            )
          )}
        </UISelect>
      </div>
    )
  }
}