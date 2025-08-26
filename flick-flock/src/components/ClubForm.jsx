import { useState } from "react";
import "../styles/Clubs.css";

function ClubForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    genre: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Pretend to send to backend:", formData);
    setMessage("Club created!)");
    setFormData({ name: "", description: "", genre: "" });
  };

  return (
    <form className="club-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Club Name" value={formData.name} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} />
      <button type="submit">Create Club</button>
      {message && <p className="success">{message}</p>}
    </form>
  );
}

export default ClubForm;