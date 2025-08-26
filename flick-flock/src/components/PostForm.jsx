import { useState } from "react";
import Swal from "sweetalert2";
import { useApi } from "../contexts/globalendpoints";
import "../styles/PostForm.css";

function PostForm({ clubId, onClose, onPostCreated }) {
  const [formData, setFormData] = useState({
    movieId: "",
    content: "",
    rating: "",
  });

  const api = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ movieId: "", content: "", rating: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { movieId, content, rating } = formData;

    if (!movieId || !content || !rating) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields!",
        text: "Please fill in all fields.",
        background: "#1c1c1c",
        color: "#fff",
        confirmButtonColor: "#e50914",
      });
      return;
    }

    try {
      const payload = {
        club_id: clubId,
        movie_series_id: movieId,
        content,
        rating: parseFloat(rating),
      };

      const newPost = await api.createPost(payload);

      Swal.fire({
        icon: "success",
        title: "Post Created!",
        text: "Your movie thoughts have been shared.",
        background: "#141414",
        color: "#fff",
        confirmButtonColor: "#e50914",

      });

      resetForm();
      onPostCreated?.(newPost);  // notify parent to add post to list
      onClose?.();
    } catch (err) {
      console.error("Error creating post:", err);
      Swal.fire({
        icon: "error",
        title: "Post Failed",
        text: "Could not submit your post.",
        background: "#1c1c1c",
        color: "#fff",
        confirmButtonColor: "#e50914",
      });
    }
  };

  return (
    <div className="post-form-container">
      <h3>Add a Post</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="movieId"
          placeholder="Movie/Series ID"
          value={formData.movieId}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Write your thoughts..."
          value={formData.content}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-10)"
          value={formData.rating}
          onChange={handleChange}
          min="1"
          max="10"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default PostForm;
