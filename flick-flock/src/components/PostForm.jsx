import { useState } from "react";
import "../styles/PostForm.css";

function PostForm({ clubId, onClose }) {
  const [movieId, setMovieId] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!movieId || !content || !rating) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          club_id: clubId,
          movie_series_id: movieId,
          content,
          rating: parseFloat(rating),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post.");
      }

      const data = await response.json();
      console.log("Post submitted:", data);

      setSuccess("Post created!");
      setError("");
      setMovieId("");
      setContent("");
      setRating("");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Error submitting post:", err);
      setError("Failed to create post.");
      setSuccess("");
    }
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
