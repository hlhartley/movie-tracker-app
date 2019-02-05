import React from 'react';

export const MovieInfoCard = ({ title, id, release_date, poster_path, overview }) => {
  return(
    <div className='movie-info'>
      <div>
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className='movie-info-poster'/>
      </div>
      <div>
        <h2>{title}</h2>
        <p className='released-text'>Released: {release_date}</p>
        <p>{overview}</p>
      </div>
    </div>
  )
}