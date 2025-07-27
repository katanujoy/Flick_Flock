import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Using Vite's environment variable format

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`
  }
});

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/day');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const [details, videos, credits] = await Promise.all([
      api.get(`/movie/${movieId}`),
      api.get(`/movie/${movieId}/videos`),
      api.get(`/movie/${movieId}/credits`)
    ]);
    
    return {
      ...details.data,
      videos: videos.data.results,
      credits: credits.data
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const getFilteredMovies = async (filters, page = 1) => {
  try {
    const { genre, year, rating } = filters;
    const params = { page };
    
    if (genre) params.with_genres = genre;
    if (year) params.primary_release_year = year;
    if (rating) params.vote_average_gte = rating;
    
    const response = await api.get('/discover/movie', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered movies:', error);
    throw error;
  }
};

export const authenticateUser = async (username, password) => {
  // This is a mock authentication function
  // In a real app, you would make an API call to your auth endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple validation - in real app, this would be handled by your backend
      if (username === 'user' && password === 'password') {
        resolve({ success: true, user: { username } });
      } else {
        resolve({ success: false, message: 'Invalid credentials' });
      }
    }, 1000);
  });
};