import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignupPage.css';

function SignupPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    favorite_genres: []
  });

  const genres = [
    'Action', 'Comedy', 'Drama', 'Horror', 
    'Sci-Fi', 'Romance', 'Thriller', 'Animation',
    'Documentary', 'Fantasy', 'Mystery', 'Crime'
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleGenre = (genre) => {
    setForm(prev => ({
      ...prev,
      favorite_genres: prev.favorite_genres.includes(genre)
        ? prev.favorite_genres.filter(g => g !== genre)
        : [...prev.favorite_genres, genre]
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Signup successful! You can now log in.');
        navigate('/login');
      } else {
        alert(data.msg || 'Signup failed');
      }
    } catch (error) {
      alert('An error occurred during signup');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <p className="signup-subtitle">Create your account to get started</p>

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Bio (Optional)</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="genre-section">
            <h3>Favorite Genres</h3>
            <div className="genre-cloud">
              {genres.map(genre => (
                <button
                  type="button"
                  key={genre}
                  className={`genre-pill ${form.favorite_genres.includes(genre) ? 'selected' : ''}`}
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>

        <p className="login-redirect">
          Already have an account? <Link to="/login" className="login-link">Log in here</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;