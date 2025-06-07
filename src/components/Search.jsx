import React from 'react'

const Search = ({ searchTerm, setSearchTerm, onClear }) => {
  const handleClear = () => {
    setSearchTerm('')
    if (onClear) {
      onClear()
    }
  }


  
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="Search" />
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear search"
          >
            <img src="./close.svg" alt="Clear" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Search
