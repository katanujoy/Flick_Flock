import ClubCard from "../components/ClubCard";
import { mockClubs } from "../mock/clubs";
import "../styles/Clubs.css";
import { Link } from "react-router-dom";

function ExploreClubsPage() {
  return (
    <div className="explore-page">
      <div className="explore-header">
        <h2>Popular Clubs</h2>
        <Link to="/clubs/new" className="add-button">+ Add Club</Link>
      </div>

      <div className="club-grid">
        {mockClubs.map(club => (
          <Link key={club.id} to={`/club/${club.id}`} className="club-link">
            <ClubCard club={club} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ExploreClubsPage;