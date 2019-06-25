import React from 'react';

const GenreItem = (props) => {
  const { genre, index, onChangeGenre } = props;
  return (
    <div key={genre.id}className="form-check">
      <input 
        className="form-check-input" 
        type="checkbox"
        name={index}
        id={genre.id}
        value={genre.id}
        checked={genre.checked}
        onChange={onChangeGenre}
      />
      <label 
        className="form-check-label" 
       htmlFor={genre.id}
      >{genre.name}</label>
    </div>
  )
}

export default GenreItem;