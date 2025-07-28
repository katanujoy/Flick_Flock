import { useState } from "react";
import "../styles/Movies.css";

function MovieForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    type: "movie", // default
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // In real app, replace with axios POST request
    if (formData.title && formData.type) {
      console.log("Submitting movie:", formData);
      setMessage("✅ Movie/Series added successfully!");
      setFormData({ title: "", description: "", genre: "", type: "movie" });
    } else {
      setError("❌ Title and Type are required.");
    }
  };

  return (
    <div className="movie-form">
      <h2>Add New Movie or Series</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
        />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default MovieForm;