// import { Link } from "react-router-dom";
// import MovieCard from "../components/MovieCard";
// import { mockMovies } from "../mock/movies";
// import "../styles/Movies.css";

// function MoviesListPage() {
//   return (
//     <div className="movies-page">
//       <div className="movies-header">
//         <h2>All Movies & Series</h2>
//         <Link to="/movies/new" className="add-button">+ Add Movie</Link>
//       </div>

//       <div className="movie-grid">
//         {mockMovies.map((movie) => (
//           <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-link">
//             <MovieCard movie={movie} />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MoviesListPage;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import "../styles/Movies.css";

function MoviesListPage() {
  const api = useApi();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getMovies()
      .then(setMovies)
      .catch((err) => {
        console.error("Error loading movies:", err);
        setError("Failed to load movies. Please try again later.");
      });
  }, [api]);

  return (
    <div className="movies-page">
      <div className="movies-header">
        <h2>All Movies & Series</h2>
        <Link to="/movies/new" className="add-button">+ Add Movie</Link>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-link">
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MoviesListPage;