// import { Link, useNavigate } from "react-router-dom";
// import "../styles/Navbar.css";
// import { useState } from "react";

// function Navbar() {
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/search?q=${query}`);
//       setQuery("");
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <Link to="/" className="logo">FlickFlock</Link>
//         <Link to="/movies">Movies</Link>
//         <Link to="/clubs">Clubs</Link>
//         <Link to="/watchlist">Watchlist</Link>
//       </div>

//       <form className="navbar-search" onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//       </form>

//       <div className="navbar-auth">
//         <Link to="/login">Login</Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useState } from "react";
import { useAuth } from "../contexts/authcontext";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">🎬 FlickFlock</Link>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/clubs">Clubs</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/followers">Followers</Link>
      </div>

      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className="navbar-auth">
        {user ? (
          <>
            <span className="welcome-msg">Hi, {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;


