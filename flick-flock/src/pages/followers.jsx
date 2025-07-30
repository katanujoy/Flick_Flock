import React, { useEffect, useState, useCallback } from 'react';
import { Card, Button, Row, Col, Container, Spinner } from 'react-bootstrap';
import { useApi } from '../contexts/globalendpoints';
import { useAuth } from '../contexts/authcontext';

const FollowersPage = () => {
  const api = useApi();
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [follows, setFollows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [userData, followData] = await Promise.all([
        api.getUsers(),
        api.getFollows(),
      ]);
      setUsers(userData || []);
      setFollows(followData || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    if (api && currentUser) {
      fetchData();
    }
  }, [api, currentUser, fetchData]);

  const isFollowing = (userId) =>
    follows.find(
      (f) => f.follower_id === currentUser?.id && f.followed_id === userId
    );

  const handleFollowToggle = async (followedUserId) => {
    setFollowLoading(followedUserId);
    const existingFollow = isFollowing(followedUserId);

    try {
      if (existingFollow) {
        await api.unfollowUser(existingFollow.id);
      } else {
        await api.followUser({ followed_id: followedUserId });
      }
      await fetchData();
    } catch (err) {
      console.error('Follow toggle failed:', err);
    } finally {
      setFollowLoading(null);
    }
  };

  const filteredUsers = users.filter((u) => u.id && u.id !== currentUser?.id);
  const followingUsers = filteredUsers.filter((u) => isFollowing(u.id));
  const suggestedUsers = filteredUsers.filter((u) => !isFollowing(u.id));

  const renderUserCard = (user) => {
    const following = isFollowing(user.id);

    return (
      <Col md={4} key={`user-${user.id}`}>
        <Card className="mb-4 shadow-sm">
          <Card.Img
            variant="top"
            src={user.profile_picture || '/default-profile.png'}
            style={{ height: '200px', objectFit: 'cover' }}
            alt={`${user.username}'s profile`}
          />
          <Card.Body>
            <Card.Title>{user.username || 'Unknown User'}</Card.Title>
            <Card.Text>
              Favorite Genres: {user.favorite_genres ? user.favorite_genres : 'Unknown'}
            </Card.Text>
            <Button
              variant={following ? 'danger' : 'success'}
              onClick={() => handleFollowToggle(user.id)}
              disabled={followLoading === user.id}
            >
              {followLoading === user.id ? (
                <Spinner size="sm" animation="border" />
              ) : following ? (
                'Unfollow'
              ) : (
                'Follow'
              )}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  if (loading) {
    return (
      <Container className="py-5 text-center text-white">
        <Spinner animation="border" variant="light" />
        <p>Loading suggestions...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="text-white mb-4">👥 Following</h2>
      <Row>
        {followingUsers.length > 0 ? (
          followingUsers.map(renderUserCard)
        ) : (
          <p className="text-light">You're not following anyone yet.</p>
        )}
      </Row>

      <h2 className="text-white mt-5 mb-4">🌱 Suggestions (Build the Pack)</h2>
      <Row>
        {suggestedUsers.length > 0 ? (
          suggestedUsers.map(renderUserCard)
        ) : (
          <p className="text-light">No suggestions at the moment.</p>
        )}
      </Row>
    </Container>
  );
};

export default FollowersPage;
