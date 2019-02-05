import React from 'react';

export const MovieInfoCard = ({ title, id, release_date, poster_path, overview }) => {
  return(
    <div className='movie-info'>
      <h2>{title}</h2>
      <p>{release_date}</p>
      <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`}/>
      <p>{overview}</p>
    </div>
  )
}