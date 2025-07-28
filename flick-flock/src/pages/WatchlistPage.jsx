import { useState } from "react";
import { mockWatchlist } from "../mock/watchlist";
import { mockMovies } from "../mock/movies";
import "../styles/Movies.css";

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState(mockWatchlist);

  const handleRemove = (id) => {
    // Replace with DELETE request later
    const updated = watchlist.filter((entry) => entry.id !== id);
    setWatchlist(updated);
  };

  const getMovie = (id) => mockMovies.find((m) => m.id === id);

  return (
    <div className="watchlist-page">
      <h2>My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No items in your watchlist.</p>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((entry) => {
            const movie = getMovie(entry.movie_series_id);
            return (
              <div key={entry.id} className="watchlist-card">
                <h3>{movie?.title || "Unknown Title"}</h3>
                <p>Status: {entry.status}</p>
                <p className="desc">{entry.notes}</p>
                <p className="meta">Added on: {entry.added_at}</p>
                <button onClick={() => handleRemove(entry.id)}>Remove</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;