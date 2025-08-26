import React, { createContext, useContext } from "react";

const API_BASE = "http://localhost:5000";
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const getToken = () => localStorage.getItem("access_token");

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  const handleResponse = async (res) => {
    const data = await res.json();
    if (!res.ok) {
      const errorMsg = data.message || data.error || "Something went wrong";
      throw new Error(errorMsg);
    }
    return data;
  };


  const api = {
    //AUTH
    loginUser: (payload) =>
      fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then(handleResponse),

    //USERS
    getUsers: () =>
      fetch(`${API_BASE}/api/users`, { headers: authHeaders() }).then(handleResponse),

    getProfile: () =>
    fetch(`${API_BASE}/api/users/me`, {
      headers: authHeaders(),
    }).then(handleResponse),


    updateUserProfile: (userId, payload) =>
      fetch(`${API_BASE}/api/users/${userId}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    //CLUBS
    getClubs: () =>
      fetch(`${API_BASE}/api/clubs`, { headers: authHeaders() }).then(handleResponse),

    createClub: (payload) =>
      fetch(`${API_BASE}/api/clubs`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    updateClub: (payload) =>
      fetch(`${API_BASE}/api/clubs`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    deleteClub: (id) =>
      fetch(`${API_BASE}/api/clubs`, {
        method: "DELETE",
        headers: authHeaders(),
        body: JSON.stringify({ id }),
      }).then(handleResponse),

    //COMMENTS
    getComments: () =>
      fetch(`${API_BASE}/comments`, { headers: authHeaders() }).then(handleResponse),

    createComment: (payload) =>
      fetch(`${API_BASE}/comments`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    //POSTS
    getPosts: () =>
      fetch(`${API_BASE}/api/posts`, { headers: authHeaders() }).then(handleResponse),

    getPost: (postId) =>
      fetch(`${API_BASE}/api/posts/${postId}`, { headers: authHeaders() }).then(handleResponse),

    createPost: (payload) =>
      fetch(`${API_BASE}/api/posts`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    
    updatePost: (id, payload) =>
      fetch(`${API_BASE}/api/posts/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    deletePost: (id) =>
      fetch(`${API_BASE}/api/posts/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      }).then(handleResponse),

    //WATCHLIST
    getWatchlist: () =>
      fetch(`${API_BASE}/watchlist`, { headers: authHeaders() }).then(handleResponse),

    addToWatchlist: (payload) =>
      fetch(`${API_BASE}/watchlist`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    removeFromWatchlist: (id) =>
      fetch(`${API_BASE}/watchlist`, {
        method: "DELETE",
        headers: authHeaders(),
        body: JSON.stringify({ id }),
      }).then(handleResponse),

    //RECOMMENDATIONS
    getRecommendations: () =>
      fetch(`${API_BASE}/api/recommendations`, { headers: authHeaders() }).then(handleResponse),

    getRecommendationById: (id) =>
      fetch(`${API_BASE}/api/recommendations/${id}`, { headers: authHeaders() }).then(handleResponse),

    createRecommendation: (payload) =>
      fetch(`${API_BASE}/api/recommendations`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    updateRecommendation: (id, payload) =>
      fetch(`${API_BASE}/api/recommendations/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    deleteRecommendation: (id) =>
      fetch(`${API_BASE}/api/recommendations/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      }).then(handleResponse),


    //REPORTS
    createReport: (payload) =>
      fetch(`${API_BASE}/reports`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    //FOLLOW
    followUser: (payload) =>
      fetch(`${API_BASE}/follows`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    unfollowUser: (id) =>
      fetch(`${API_BASE}/follows/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      }).then(handleResponse),

    getFollows: () =>
      fetch(`${API_BASE}/follows`, {
        headers: authHeaders(),
      }).then(handleResponse),
        

    //MEMBERSHIP
    joinClub: (payload) =>
      fetch(`${API_BASE}/membership`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

   // MOVIES
    getMovies: () =>
      fetch(`${API_BASE}/api/movies`, { headers: authHeaders() }).then(handleResponse),

    getMovieById: (id) =>
      fetch(`${API_BASE}/api/movies/${id}`, { headers: authHeaders() }).then(handleResponse),

    createMovie: (payload) =>
      fetch(`${API_BASE}/api/movies`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    updateMovie: (id, payload) =>
      fetch(`${API_BASE}/api/movies/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),

    deleteMovie: (id) =>
      fetch(`${API_BASE}/api/movies/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      }).then(handleResponse),

    searchMovies: ({ search = "", page = 1, limit = 10 }) =>
      fetch(
        `${API_BASE}/api/movies/search?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`,
        { headers: authHeaders() }
      ).then(handleResponse),

    //M-PESA
    stkPush: (payload) =>
      fetch(`${API_BASE}/mpesa/stkpush`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).then(handleResponse),
  };

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);