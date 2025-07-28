import "../styles/Movies.css";

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <p className="review-content">“{review.content}”</p>
      <div className="review-meta">
        <span>User ID: {review.user_id}</span>
        <span>⭐ {review.rating}/10</span>
        <span>{review.created_at}</span>
      </div>
    </div>
  );
}

export default ReviewCard;