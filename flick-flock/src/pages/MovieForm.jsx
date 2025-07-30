// import { useState } from "react";
// import "../styles/Movies.css";

// function MovieForm() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     genre: "",
//     type: "movie", // default
//   });
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setMessage("");
//     setError("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // In real app, replace with axios POST request
//     if (formData.title && formData.type) {
//       console.log("Submitting movie:", formData);
//       setMessage("✅ Movie/Series added successfully!");
//       setFormData({ title: "", description: "", genre: "", type: "movie" });
//     } else {
//       setError("❌ Title and Type are required.");
//     }
//   };

//   return (
//     <div className="movie-form">
//       <h2>Add New Movie or Series</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="title"
//           placeholder="Title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//         />
//         <input
//           name="genre"
//           placeholder="Genre"
//           value={formData.genre}
//           onChange={handleChange}
//         />
//         <select name="type" value={formData.type} onChange={handleChange}>
//           <option value="movie">Movie</option>
//           <option value="series">Series</option>
//         </select>
//         <button type="submit">Add</button>
//       </form>

//       {message && <p className="success">{message}</p>}
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// }

// export default MovieForm;


import { useState } from "react";
import Swal from "sweetalert2";
import { useApi } from "../contexts/globalendpoints";
import "../styles/Movies.css";

function MovieForm() {
  const { createMovie } = useApi(); 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    type: "movie",
    release_year: "",
    poster_url: "",
    download_link: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.type) {
      Swal.fire("Error", "Title and Type are required!", "error");
      return;
    }

    try {
      const payload = {
        ...formData,
        release_year: parseInt(formData.release_year) || null
      };

      await createMovie(payload);

      Swal.fire("Success", "🎬 Movie/Series added successfully!", "success");

      setFormData({
        title: "",
        description: "",
        genre: "",
        type: "movie",
        release_year: "",
        poster_url: "",
        download_link: ""
      });
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to add movie", "error");
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
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
        <input
          type="number"
          name="release_year"
          placeholder="Release Year"
          value={formData.release_year}
          onChange={handleChange}
        />
        <input
          name="poster_url"
          placeholder="Poster URL"
          value={formData.poster_url}
          onChange={handleChange}
        />
        <input
          name="download_link"
          placeholder="Download Link"
          value={formData.download_link}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default MovieForm;