function ClubCard({ club }) {
  return (
    <div className="club-card">
      <h3>{club.name}</h3>
      <p className="description">{club.description}</p>
      <span className="genre">{club.genre}</span>
    </div>
  );
}

export default ClubCard;