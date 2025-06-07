import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { updateSearchCount, getTrendingMovies } from './appwrite.js'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isloading, setIsLoading] = useState(false)
  const [movielist, setMovieList] = useState([])
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [trendingMovies, setTrendingMovies] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()
      setTrendingMovies(movies || [])
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`)
    }
  }

  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      // Check if API key exists
      if (!API_KEY) {
        throw new Error(
          'TMDB API key is not configured. Please check your environment variables.'
        )
      }

      const endPoint = query
        ? `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
          )}&include_adult=false&language=en-US&page=1`
        : `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&language=en-US&page=1`

      const response = await fetch(endPoint)

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your TMDB API key.')
        } else if (response.status === 404) {
          throw new Error('API endpoint not found.')
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
      }

      const data = await response.json()

      if (data.success === false) {
        throw new Error(data.status_message || 'Failed to fetch movies')
      }

      const movies = data.results || []
      setMovieList(movies)

      // Update search count only if we have results and it's a search query
      if (query && movies.length > 0) {
        try {
          await updateSearchCount(query, movies[0])
        } catch (error) {
          console.error('Error updating search count:', error)
          // Don't throw here, search count is not critical
        }
      }

      // If no results found for search
      if (query && movies.length === 0) {
        setErrorMessage(
          'No movies found for your search. Try different keywords.'
        )
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage(
        error.message || 'Error fetching movies. Please try again later.'
      )
      setMovieList([])
    } finally {
      setIsLoading(false)
      setInitialLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  const handleRetry = () => {
    fetchMovies(debouncedSearchTerm)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setErrorMessage('')
  }

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onClear={clearSearch}
          />
        </header>

        {trendingMovies.length > 0 && !searchTerm && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img
                    src={movie.poster_url || '/fallback.jpg'}
                    alt={movie.title}
                    onError={(e) => {
                      e.target.src = '/fallback.jpg'
                    }}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>
            {searchTerm
              ? `Search Results for "${searchTerm}"`
              : 'Popular Movies'}
          </h2>

          {initialLoading ? (
            <div className="loading-container">
              <Spinner />
              <p className="loading-text">Loading movies...</p>
            </div>
          ) : errorMessage ? (
            <div className="error-container">
              <div className="error-content">
                <img
                  src="./error-icon.svg"
                  alt="Error"
                  className="error-icon"
                />
                <p className="error-message">{errorMessage}</p>
                <button onClick={handleRetry} className="retry-button">
                  Try Again
                </button>
              </div>
            </div>
          ) : isloading ? (
            <div className="loading-container">
              <Spinner />
              <p className="loading-text">Searching...</p>
            </div>
          ) : movielist.length === 0 ? (
            <div className="empty-state">
              <img
                src="./empty-state.svg"
                alt="No movies"
                className="empty-icon"
              />
              <p className="empty-message">No movies to display</p>
              <p className="empty-subtitle">Try adjusting your search terms</p>
            </div>
          ) : (
            <ul className="movie-grid">
              {movielist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
