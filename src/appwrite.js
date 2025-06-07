import { Client, Databases, ID, Query } from 'appwrite'
import { config, validateConfig } from './utils/config.js'

// Validate configuration on import
const configValidation = validateConfig()
if (!configValidation.isValid) {
  console.warn(
    'Appwrite configuration issues detected:',
    configValidation.errors
  )
}

const client = new Client()
  .setEndpoint(config.appwrite.endpoint)
  .setProject(config.appwrite.projectId)

const database = new Databases(client)

export const updateSearchCount = async (searchTerm, movie) => {
  // Early return if configuration is invalid
  if (
    !config.appwrite.projectId ||
    !config.appwrite.databaseId ||
    !config.appwrite.collectionId
  ) {
    console.warn(
      'Appwrite not properly configured, skipping search count update'
    )
    return
  }

  try {
    const result = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.collectionId,
      [Query.equal('searchTerm', searchTerm)]
    )

    // If search term exists, update the count
    if (result.documents.length > 0) {
      const doc = result.documents[0]
      await database.updateDocument(
        config.appwrite.databaseId,
        config.appwrite.collectionId,
        doc.$id,
        {
          count: doc.count + 1,
          lastSearched: new Date().toISOString(),
        }
      )
    } else {
      // Create new document with search term
      await database.createDocument(
        config.appwrite.databaseId,
        config.appwrite.collectionId,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          title: movie.title,
          poster_url: movie.poster_path
            ? `${config.tmdb.imageBaseUrl}${movie.poster_path}`
            : null,
          rating: movie.vote_average || 0,
          release_date: movie.release_date || null,
          created: new Date().toISOString(),
          lastSearched: new Date().toISOString(),
        }
      )
    }
  } catch (error) {
    console.error('Error updating search count:', error)
    // Don't throw the error to prevent breaking the search functionality
  }
}

export const getTrendingMovies = async () => {
  // Early return if configuration is invalid
  if (
    !config.appwrite.projectId ||
    !config.appwrite.databaseId ||
    !config.appwrite.collectionId
  ) {
    console.warn(
      'Appwrite not properly configured, returning empty trending movies'
    )
    return []
  }

  try {
    const result = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.collectionId,
      [Query.limit(5), Query.orderDesc('count'), Query.isNotNull('poster_url')]
    )

    return result.documents || []
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    return []
  }
}
