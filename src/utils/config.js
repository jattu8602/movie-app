// Configuration and environment variable validation

export const config = {
  // TMDB API Configuration
  tmdb: {
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
    baseUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p/w500',
  },

  // Appwrite Configuration
  appwrite: {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    endpoint: 'https://fra.cloud.appwrite.io/v1',
  },
}

// Validate required environment variables
export const validateConfig = () => {
  const errors = []

  if (!config.tmdb.apiKey) {
    errors.push('VITE_TMDB_API_KEY is required for TMDB API access')
  }

  if (!config.appwrite.projectId) {
    errors.push('VITE_APPWRITE_PROJECT_ID is required for Appwrite integration')
  }

  if (!config.appwrite.databaseId) {
    errors.push(
      'VITE_APPWRITE_DATABASE_ID is required for Appwrite integration'
    )
  }

  if (!config.appwrite.collectionId) {
    errors.push(
      'VITE_APPWRITE_COLLECTION_ID is required for Appwrite integration'
    )
  }

  if (errors.length > 0) {
    console.error('Configuration errors:', errors)
    return { isValid: false, errors }
  }

  return { isValid: true, errors: [] }
}

// Development helper
export const isDevelopment = import.meta.env.DEV
export const isProduction = import.meta.env.PROD
