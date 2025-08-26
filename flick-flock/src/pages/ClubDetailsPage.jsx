import { useParams, useNavigate } from "react-router-dom";
import { mockClubs } from "../mock/clubs";
import "../styles/Clubs.css";
import { useState, useEffect } from "react";
import PostForm from "../components/PostForm";
import MembershipCard from "../components/MembershipCard";

function ClubDetailsPage() {
  const { id } = useParams();
  const club = mockClubs.find((c) => c.id === parseInt(id));
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showMembershipCard, setShowMembershipCard] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  useEffect(() => {
    if (!club) {
      setError("Club not found.");
    }
  }, [club]);

  const handleJoin = () => {
    if (!isLoggedIn) {
      setError("Please log in to join this club.");
      return;
    }

    setJoined(true);
    setMessage("You’ve joined this club!");
    setError("");
    setShowForm(false);
    setShowMembershipCard(false); // Hide membership card
  };

  const handleLeave = () => {
    setJoined(false);
    setMessage("You’ve left the club.");
    setShowForm(false);
    setShowMembershipCard(false); // Hide membership card
    setError("");
  };

  const handleAddPost = () => {
    if (!joined) {
      setError("Join the club first to add a post.");
      return;
    }

    setShowForm(true);
    setShowMembershipCard(false); // Hide membership card
    setMessage("");
    setError("");
  };

  const handleViewMembership = () => {
    if (!isLoggedIn) {
      setError("Please log in to become a member.");
      return;
    }

    setShowForm(false); // Hide form
    setShowMembershipCard(true); // Show membership card
    setError("");
  };

  if (!club) return <p className="error">Club not found.</p>;

  return (
    <div className="club-details">
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

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
          <button className="membership-btn" onClick={handleViewMembership}>
            Become a Member (Kshs 200)
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

      {showMembershipCard && (
        <MembershipCard
          clubId={club.id}
          onClose={() => setShowMembershipCard(false)}
        />
      )}
    </div>
  );
}

export default ClubDetailsPage;
