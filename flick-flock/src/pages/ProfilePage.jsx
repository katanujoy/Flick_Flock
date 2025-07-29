import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Profile.css";

function ProfilePage() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUserData({ username: data.username, email: data.email });
        } else {
          alert(data.msg || 'Failed to load profile');
        }
      } catch (err) {
        alert('Error loading profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Profile updated successfully!');
        setEditing(false);
      } else {
        alert(data.msg || 'Failed to update profile');
      }
    } catch (err) {
      alert('Error updating profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      {editing ? (
        <>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ProfilePage;

