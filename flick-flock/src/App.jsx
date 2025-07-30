import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "./contexts/authcontext";
import ProtectedRoute from "./components/protectedroutes";

import HomePage from "./pages/home";
import About from "./pages/about";
import ContactForm from "./pages/contact";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MoviesListPage from "./pages/MoviesListPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieForm from "./pages/MovieForm";
import WatchlistPage from "./pages/WatchlistPage";
import ExploreClubsPage from "./pages/ExploreClubsPage";
import ClubForm from "./components/ClubForm";
import ClubDetailsPage from "./pages/ClubDetailsPage";
import FollowersPage from "./pages/followers";

// Placeholder page
const SearchPage = () => (
  <div className="text-white p-4">
    <h2>Search results coming soon...</h2>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/movies" element={<ProtectedRoute><MoviesListPage /></ProtectedRoute>} />
          <Route path="/movie/:id" element={<ProtectedRoute><MovieDetailsPage /></ProtectedRoute>} />
          <Route path="/movies/new" element={<ProtectedRoute><MovieForm /></ProtectedRoute>} />
          <Route path="/watchlist" element={<ProtectedRoute><WatchlistPage /></ProtectedRoute>} />
          <Route path="/clubs" element={<ProtectedRoute><ExploreClubsPage /></ProtectedRoute>} />
          <Route path="/clubs/new" element={<ProtectedRoute><ClubForm /></ProtectedRoute>} />
          <Route path="/club/:id" element={<ProtectedRoute><ClubDetailsPage /></ProtectedRoute>} />
          <Route path="/followers" element={<ProtectedRoute><FollowersPage /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
