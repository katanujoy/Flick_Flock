import "../styles/Movies.css";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-type-tag">{movie.type}</div>
      <h3>{movie.title}</h3>
      <p className="genre">{movie.genre}</p>
      <p className="desc">{movie.description.slice(0, 80)}...</p>
    </div>
  );
}

export default MovieCard;