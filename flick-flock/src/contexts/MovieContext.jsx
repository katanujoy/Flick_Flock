import { createContext, useContext, useState, useEffect } from "react";
import { getGenres } from "../services/movieApi";

const MovieContext = createContext();

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [lastSearch, setLastSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({ genre: "", year: "", rating: "" });
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success', 'error', 'warning', 'info'
  });

  // Load favorites, last search, user and dark mode from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const storedLastSearch = localStorage.getItem("lastSearch");
    const storedDarkMode = localStorage.getItem("darkMode");
    const storedUser = localStorage.getItem("user");

    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedLastSearch) setLastSearch(storedLastSearch);
    if (storedDarkMode) setDarkMode(JSON.parse(storedDarkMode));
    if (storedUser) setUser(JSON.parse(storedUser));

    // Fetch genres on mount
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const genresList = await getGenres();
      setGenres(genresList);
    } catch (error) {
      console.error("Failed to fetch genres:", error);
    }
  };

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("lastSearch", lastSearch);
  }, [lastSearch]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((m) => m.id === movie.id);
      if (isFavorite) {
        showSnackbar(`Removed "${movie.title}" from favorites`, "info");
        return prev.filter((m) => m.id !== movie.id);
      }
      showSnackbar(`Added "${movie.title}" to favorites`, "success");
      return [...prev, movie];
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const login = (userData) => {
    setUser(userData);
    showSnackbar(`Welcome, ${userData.username}!`, "success");
  };

  const logout = () => {
    setUser(null);
    showSnackbar("You have been logged out", "info");
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const resetFilters = () => {
    setFilters({ genre: "", year: "", rating: "" });
    setCurrentPage(1);
  };

  const updateMovieList = (data) => {
    setMovies(data.results);
    setTotalPages(data.total_pages);
    setCurrentPage(data.page);
  };

  const appendMovies = (data) => {
    setMovies((prev) => [...prev, ...data.results]);
    setTotalPages(data.total_pages);
    setCurrentPage(data.page);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        updateMovieList,
        appendMovies,
        favorites,
        toggleFavorite,
        lastSearch,
        setLastSearch,
        darkMode,
        toggleDarkMode,
        user,
        login,
        logout,
        filters,
        updateFilters,
        resetFilters,
        genres,
        loading,
        setLoading,
        totalPages,
        currentPage,
        setCurrentPage,
        snackbar,
        showSnackbar,
        closeSnackbar,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};