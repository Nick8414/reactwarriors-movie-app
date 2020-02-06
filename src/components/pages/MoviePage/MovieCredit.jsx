import React from 'react'

function MovieCredit() {
    return (
        <span style={{ display: 'inline-block', margin: '5px' }} key={item.id}>
          <img
            style={{ height: '180px', width: '120px', cursor: 'pointer' }}
            src={` https://image.tmdb.org/t/p/w500${item.profile_path}`} 
            // image вынести в компонент
            alt=''
            title={item.character}
          />
        </span>
    )
}

export default MovieCredit