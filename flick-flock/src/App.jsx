<<<<<<< .merge_file_OyBJqJ
 import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import MoviesListPage from "./pages/MoviesListPage";
import ExploreClubsPage from "./pages/ExploreClubsPage";
import ClubForm from "./components/ClubForm";
import ClubDetailsPage from "./pages/ClubDetailsPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieForm from "./pages/MovieForm";
import WatchlistPage from "./pages/WatchlistPage";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Fake search page until we build it
function SearchPage() {
  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Search results coming soon...</h2>
    </div>
  );
}
>>>>>>> .merge_file_4e4onQ

function App() {
  return (
    <Router>
<<<<<<< .merge_file_OyBJqJ
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
=======
      <Navbar />

      <Routes>
        <Route path="/movies" element={<MoviesListPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/movies/new" element={<MovieForm />} />

        <Route path="/clubs" element={<ExploreClubsPage />} />
        <Route path="/clubs/new" element={<ClubForm />} />
        <Route path="/club/:id" element={<ClubDetailsPage />} />

        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/" element={<MoviesListPage />} />
>>>>>>> .merge_file_4e4onQ
      </Routes>
    </Router>
  );
}

export default App;
