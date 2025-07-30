// import { useParams } from "react-router-dom";
// import { mockMovies } from "../mock/movies";
// import { mockPosts } from "../mock/posts";
// import ReviewCard from "../components/ReviewCard";
// import "../styles/Movies.css";
// import { useState } from "react";

// function MovieDetailsPage() {
//   const { id } = useParams();
//   const movie = mockMovies.find((m) => m.id === parseInt(id));
//   const reviews = mockPosts.filter((post) => post.movie_series_id === parseInt(id));

//   const [watchlisted, setWatchlisted] = useState(false);
//   const [recommended, setRecommended] = useState(false);

//   if (!movie) return <p className="error">Movie not found.</p>;

//   return (
//     <div className="movie-details">
//       <h2>{movie.title}</h2>
//       <p className="genre">Genre: {movie.genre}</p>
//       <p className="desc">{movie.description}</p>
//       <p className="movie-type-tag">Type: {movie.type}</p>

//       <div className="movie-buttons">
//         <button
//           className="watchlist-btn"
//           onClick={() => setWatchlisted(!watchlisted)}
//         >
//           {watchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
//         </button>

//         <button
//           className="recommend-btn"
//           onClick={() => setRecommended(!recommended)}
//         >
//           {recommended ? "Unrecommend" : "Recommend"}
//         </button>
//       </div>

//       <h3>User Reviews</h3>
//       {reviews.length > 0 ? (
//         <div className="review-grid">
//           {reviews.map((review) => (
//             <ReviewCard key={review.id} review={review} />
//           ))}
//         </div>
//       ) : (
//         <p>No reviews yet.</p>
//       )}
//     </div>
//   );
// }

// export default MovieDetailsPage;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../contexts/globalendpoints";
import ReviewCard from "../components/ReviewCard";
import "../styles/Movies.css";

function MovieDetailsPage() {
  const { id } = useParams();
  const api = useApi();

  const [movie, setMovie] = useState(null);
  const [allRecommendations, setAllRecommendations] = useState([]);
  const [newRecommendation, setNewRecommendation] = useState("");
  const [watchlisted, setWatchlisted] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [loading, setLoading] = useState(true);

  const movieId = parseInt(id);

  useEffect(() => {
    async function fetchData() {
      try {
        const [movies, recs] = await Promise.all([
          api.getMovies(),
          api.getRecommendations()
        ]);
        const selectedMovie = movies.find((m) => m.id === movieId);
        setMovie(selectedMovie);
        setAllRecommendations(recs);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [movieId, api]);

  const reviews = allRecommendations.filter(
    (r) => r.movie_series_id === movieId
  );

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newRecommendation.trim()) return;

    try {
      const payload = {
        movie_series_id: movieId,
        recommended_reason: newRecommendation
      };
      const created = await api.createRecommendation(payload);
      setAllRecommendations((prev) => [...prev, created]);
      setNewRecommendation("");
    } catch (err) {
      console.error("Error submitting recommendation:", err);
    }
  };

  const handleReviewDelete = (deletedId) => {
    setAllRecommendations((prev) => prev.filter((r) => r.id !== deletedId));
  };

  const handleReviewEdit = (updatedReview) => {
    setAllRecommendations((prev) =>
      prev.map((r) => (r.id === updatedReview.id ? updatedReview : r))
    );
  };

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p className="error">Movie not found.</p>;

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p className="genre">Genre: {movie.genre}</p>
      <p className="desc">{movie.description}</p>
      <p className="movie-type-tag">Type: {movie.type}</p>
      <p className="release-year">Release Year: {movie.release_year}</p>

      <div className="movie-buttons">
        <button className="watchlist-btn" onClick={() => setWatchlisted(!watchlisted)}>
          {watchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>

        <button className="recommend-btn" onClick={() => setRecommended(!recommended)}>
          {recommended ? "Unrecommend" : "Recommend"}
        </button>
      </div>

      <div className="recommend-form">
        <h4>Leave a Recommendation</h4>
        <form onSubmit={handleReviewSubmit}>
          <textarea
            value={newRecommendation}
            onChange={(e) => setNewRecommendation(e.target.value)}
            placeholder="What did you enjoy about this movie?"
            rows={1}
            className="recommend-textarea"
          />
          <button type="submit" className="submit-review-btn">
            Submit
          </button>
        </form>
      </div>

      <h3>User Reviews</h3>
      {reviews.length > 0 ? (
        <div className="review-grid">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onDelete={handleReviewDelete}
              onEdit={handleReviewEdit}
            />
          ))}
        </div>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}

export default MovieDetailsPage;