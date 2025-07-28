import { useParams } from "react-router-dom";
import { mockClubs } from "../mock/clubs";
import "../styles/Clubs.css";
import { useState } from "react";
import PostForm from "../components/PostForm";

function ClubDetailsPage() {
  const { id } = useParams();
  const club = mockClubs.find(c => c.id === parseInt(id));
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); 

  const handleJoin = () => {
    try {
      setJoined(true);
      setMessage("You’ve joined this club!");
      setError("");
    } catch (err) {
      setError("Failed to join club.");
    }
  };

  const handleLeave = () => {
    try {
      setJoined(false);
      setMessage("You’ve left the club.");
      setShowForm(false); 
      setError("");
    } catch (err) {
      setError("Failed to leave club.");
    }
  };

  const handleAddPost = () => {
    if (joined) {
      setShowForm(true);
      setMessage("");
      setError("");
    } else {
      setError("Join the club first to add a post.");
    }
  };

  if (!club) return <p className="error">Club not found.</p>;

  return (
    <div className="club-details">
      <h2>{club.name}</h2>
      <p>{club.description}</p>
      <span className="genre">{club.genre}</span>
      <p className="creator">Created by user ID: {club.created_by}</p>

      {joined ? (
        <>
          <button className="leave-btn" onClick={handleLeave}>
            Leave Club
          </button>
          <button className="add-button" onClick={handleAddPost}>
            + Add Post
          </button>
        </>
      ) : (
        <button className="join-btn" onClick={handleJoin}>
          Join Club
        </button>
      )}

      {showForm && (
        <PostForm clubId={club.id} onClose={() => setShowForm(false)} />
      )}

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ClubDetailsPage;