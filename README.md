# Movie Recommendation Website

A modern movie recommendation web app built with React and Vite. Search for movies, view trending searches, and see popular movies with a beautiful UI.

## Features
- Search for movies using The Movie Database (TMDB) API
- Trending section updates based on your local searches (Appwrite backend)
- Popular movies displayed on homepage
- Responsive and visually appealing design
- Debounced search for performance

## Tech Stack
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Appwrite](https://appwrite.io/) (for trending searches)
- [TMDB API](https://www.themoviedb.org/documentation/api)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Setup
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd movie-reccomendation-website/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Create a `.env.local` file in the `frontend` directory with the following variables:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   ```
4. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

### Build for Production
```sh
npm run build
```
The production build will be in the `dist/` folder.

## Folder Structure
```
frontend/
  public/           # Static assets (SVGs, images)
  src/
    components/     # React components (MovieCard, Search)
    assets/         # Additional assets
    App.jsx         # Main app logic
    appwrite.js     # Appwrite integration
    index.css       # Global styles
    ...
  package.json
  vite.config.js
  .env.local        # (not committed)
```

## Environment Variables
- **Never commit your `.env` or `.env.local` files.**
- All sensitive keys are loaded from environment variables.

## License
MIT
