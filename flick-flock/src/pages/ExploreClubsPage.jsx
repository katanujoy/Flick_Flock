import React, { useEffect, useState } from "react";
import ClubCard from "../components/ClubCard";
import { mockClubs } from "../mock/clubs";
import "../styles/Clubs.css";
import { Link } from "react-router-dom";

function ExploreClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in. Showing mock clubs.");
      setClubs(mockClubs);
      return;
    }

    fetch("http://localhost:5000/api/clubs", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        return res.json();
      })
      .then(data => setClubs(data))
      .catch(err => {
        console.warn("API failed, using mock data:", err.message);
        setError("Failed to fetch clubs. Showing mock data instead.");
        setClubs(mockClubs);
      });
  }, []);

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h2>Popular Clubs</h2>
        <Link to="/clubs/new" className="add-button">+ Add Club</Link>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="club-grid">
        {clubs.map((club) => (
          <Link key={club.id} to={`/club/${club.id}`} className="club-link">
            <ClubCard club={club} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ExploreClubsPage;
