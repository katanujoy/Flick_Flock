// import "../styles/Movies.css";

// function MovieCard({ movie }) {
//   return (
//     <div className="movie-card">
//       <div className="movie-type-tag">{movie.type}</div>
//       <h3>{movie.title}</h3>
//       <p className="genre">{movie.genre}</p>
//       <p className="desc">{movie.description.slice(0, 80)}...</p>
//     </div>
//   );
// }

// export default MovieCard;

import React from "react";
import "../styles/Movies.css";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.poster_url} alt={movie.title} className="movie-image" />
      <div className="movie-detail">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-description">{movie.description}</p>
      </div>
    </div>
  );
}

export default MovieCard;
