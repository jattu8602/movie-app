import React, { useState } from 'react'

const MovieCard = ({
  movie: {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    overview,
  },
}) => {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const formatRating = (rating) => {
    if (!rating) return 'N/A'
    return rating.toFixed(1)
  }

  const getRatingColor = (rating) => {
    if (!rating) return 'text-gray-400'
    if (rating >= 7.5) return 'text-green-400'
    if (rating >= 6.0) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="poster-container">
        <img
          src={
            !imageError && poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : '/no-movie.png'
          }
          alt={title}
          onError={handleImageError}
          loading="lazy"
        />
        {isHovered && overview && (
          <div className="movie-overlay">
            <p className="overview">{overview}</p>
          </div>
        )}
      </div>

      <div className="movie-info">
        <h3 title={title}>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p className={getRatingColor(vote_average)}>
              {formatRating(vote_average)}
            </p>
          </div>

          {original_language && (
            <>
              <span>•</span>
              <p className="lang">{original_language.toUpperCase()}</p>
            </>
          )}

          {release_date && (
            <>
              <span>•</span>
              <p className="year">{release_date.split('-')[0]}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
