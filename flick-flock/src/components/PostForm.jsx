import { useState } from "react";
import "../styles/PostForm.css";

function PostForm({ clubId, onClose }) {
  const [movieId, setMovieId] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!movieId || !content || !rating) {
      setError("Please fill in all fields.");
      return;
    }

    // To be replaced with real API call
    console.log("Post submitted:", { clubId, movieId, content, rating });
    setSuccess("Post created!");
    setError("");
    setMovieId("");
    setContent("");
    setRating("");

    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="post-form-container">
      <h3>Add a Post</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie/Series ID"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
        />
        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating (1-10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="10"
        />
        <button type="submit">Post</button>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default PostForm;