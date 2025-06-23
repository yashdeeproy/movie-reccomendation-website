import React, { useEffect, useState, useRef } from "react";
import Search from "./components/Search";
import MovieCard from "./components/movieCard";
import { updateSearchCount,getTrendingMovies } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const debounceTimeout = useRef(null);

  const fetchMovies = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        setMovies([]);
        setError("No movies found.");
        return;
      }
      setMovies(data.results);
      if(query && data.results.length > 0) {
        // Update search count in Appwrite database
        await updateSearchCount(query, data.results[0]);
      }
      setError(null);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movies. Please try again later.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };
  const loadTrendingMovies = async () => {
    try {
      const trending = await getTrendingMovies();
      if (trending && trending.length > 0) {
        setTrendingMovies(trending);
      } else {
        setTrendingMovies([]);
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 500); // 500ms debounce
    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm]);
  useEffect(() => {
    // Fetch trending movies on initial load
    loadTrendingMovies();
  }, []);
  return (
    <main>
      <div className="pattern" />
        <div className="wrapper">
          <header>
            <img src="/hero-img.svg" alt="Hero Banner" />
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2 className="mt-[40px]">Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie,index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="all-movies">
            <h2 className="mt-[40px]">Popular Movies</h2>
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
                <svg className="animate-spin" width="48" height="48" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="indigo" strokeWidth="5" strokeLinecap="round" strokeDasharray="31.4 31.4" strokeDashoffset="0">
                    <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            )}
            {error && !loading && <p className="text-red-500">{error}</p>}
            {!loading && !error && movies.length > 0 && (
              <ul className="text-white">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
    </main>
  );
};

export default App;
