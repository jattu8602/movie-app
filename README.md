# 🎬 FindMyCinema - Movie Discovery App

Welcome to **FindMyCinema**, a sleek movie discovery web app built with React and the TMDB API. Instantly search for movies, browse trending titles, and explore content — all in one place.

---

## 🌟 Features

- 🔍 **Instant Search** with debounce for better performance
- 🔥 **Trending Movies** section powered by Appwrite
- 🎞️ **Popular & Discoverable Content** via TMDB
- 💾 **Search tracking** with Appwrite backend
- ⚡ **Responsive UI** with modern UX
- 🌀 **Loading spinner** and graceful error handling

---

## 🚀 Live Demo

👉 [Visit FindMyCinema](https://findmycinema.netlify.app/)

---

## 🛠️ Tech Stack

| Frontend     | Backend (for stats) | Other Tools       |
| ------------ | ------------------- | ----------------- |
| React        | Appwrite (DB)       | Vite (build tool) |
| Tailwind CSS |                     | TMDB API          |
| React Hooks  |                     | Netlify (deploy)  |

---

# FindMyCinema - Movie Discovery App

A modern, responsive movie discovery application built with React and Vite. Discover trending movies, search through thousands of films, and keep track of popular searches.

## Features

- 🎬 Browse popular movies from TMDB
- 🔍 Real-time movie search with debouncing
- 📊 Trending movies based on search popularity
- 📱 Responsive design for all devices
- ⚡ Fast loading with lazy image loading
- 🎨 Modern UI with smooth animations
- 🗄️ Search analytics with Appwrite backend

## Screenshots

![Movie App Interface](./public/preview.png)

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **API**: The Movie Database (TMDB)
- **Backend**: Appwrite (for search analytics)
- **State Management**: React Hooks
- **Build Tool**: Vite

## Prerequisites

Before running this application, make sure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager
- TMDB API key
- Appwrite account and project (optional, for search analytics)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd movie-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Required - TMDB API Key
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Optional - Appwrite Configuration (for search analytics)
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

### 4. Get TMDB API Key

1. Visit [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Create an account or sign in
3. Go to Settings > API
4. Request an API key
5. Copy the API key and add it to your `.env` file

### 5. Setup Appwrite (Optional)

If you want search analytics functionality:

1. Create an account at [Appwrite](https://appwrite.io/)
2. Create a new project
3. Create a database and collection with the following attributes:
   - `searchTerm` (string)
   - `count` (integer)
   - `movie_id` (integer)
   - `title` (string)
   - `poster_url` (string, optional)
   - `rating` (float, optional)
   - `release_date` (string, optional)
   - `created` (datetime)
   - `lastSearched` (datetime)

### 6. Run the Application

```bash
# Development mode
npm run dev
# or
yarn dev

# Build for production
npm run build
# or
yarn build
```

The application will be available at `http://localhost:5173`

## Deployment

### Vercel Deployment

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts and add your environment variables in the Vercel dashboard

### Netlify Deployment

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Add environment variables in the Netlify dashboard

### Environment Variables for Production

Make sure to add all environment variables in your deployment platform:

- `VITE_TMDB_API_KEY` (required)
- `VITE_APPWRITE_PROJECT_ID` (optional)
- `VITE_APPWRITE_DATABASE_ID` (optional)
- `VITE_APPWRITE_COLLECTION_ID` (optional)

## Troubleshooting

### Common Issues

1. **Movies not loading**

   - Check if your TMDB API key is valid
   - Ensure the API key is properly set in the `.env` file
   - Check the browser console for API errors

2. **Search not working**

   - Verify the TMDB API key has search permissions
   - Check network connectivity
   - Look for CORS errors in the console

3. **Trending movies not showing**

   - This feature requires Appwrite configuration
   - Check Appwrite environment variables
   - Verify database and collection setup

4. **Images not loading**

   - Check if fallback images exist in the `public` folder
   - Verify TMDB image URLs are accessible

5. **Build errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript errors if using TypeScript
   - Verify all environment variables are set

### Required Assets

Make sure these files exist in your `public` folder:

- `hero.png` - Main hero image
- `search.svg` - Search icon
- `star.svg` - Rating star icon
- `close.svg` - Clear search icon (optional)
- `no-movie.png` - Fallback for missing movie posters
- `error-icon.svg` - Error state icon (optional)
- `empty-state.svg` - Empty state icon (optional)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## API Credits

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- This product uses the TMDB API but is not endorsed or certified by TMDB
