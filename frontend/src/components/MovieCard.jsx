import React from 'react'

const movieCard = ({movie}) => {
  return (
    <div>
        <div className="movie-card">
            <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/No-Poster.svg'}
            alt={movie.title}
            />
            <div className="mt-4">
                <h3>{movie.title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src='/star.svg' alt="Star Icon" />
                        <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                    <span style={{ fontSize: '2rem', color: '#333', marginLeft: '8px' }}>•</span>
                    <p className='lang'>{movie.original_language}</p>
                    <span style={{ fontSize: '2rem', color: '#333', marginLeft: '8px' }}>•</span>
                    <p className='year'>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default movieCard
