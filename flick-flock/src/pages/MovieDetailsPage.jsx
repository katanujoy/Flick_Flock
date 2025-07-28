import { useParams } from "react-router-dom";
import { mockMovies } from "../mock/movies";
import { mockPosts } from "../mock/posts";
import ReviewCard from "../components/ReviewCard";
import "../styles/Movies.css";
import { useState } from "react";

function MovieDetailsPage() {
  const { id } = useParams();
  const movie = mockMovies.find((m) => m.id === parseInt(id));
  const reviews = mockPosts.filter((post) => post.movie_series_id === parseInt(id));

  const [watchlisted, setWatchlisted] = useState(false);
  const [recommended, setRecommended] = useState(false);

  if (!movie) return <p className="error">Movie not found.</p>;

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p className="genre">Genre: {movie.genre}</p>
      <p className="desc">{movie.description}</p>
      <p className="movie-type-tag">Type: {movie.type}</p>

      <div className="movie-buttons">
        <button
          className="watchlist-btn"
          onClick={() => setWatchlisted(!watchlisted)}
        >
          {watchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>

        <button
          className="recommend-btn"
          onClick={() => setRecommended(!recommended)}
        >
          {recommended ? "Unrecommend" : "Recommend"}
        </button>
      </div>

      <h3>User Reviews</h3>
      {reviews.length > 0 ? (
        <div className="review-grid">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}

export default MovieDetailsPage;