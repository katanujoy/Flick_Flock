import { useState, useEffect, useRef, useCallback } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button,
  Divider,
  Alert,
  Paper,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import {
  searchMovies,
  getTrendingMovies,
  getFilteredMovies,
} from "../services/movieApi";
import { useMovieContext } from "../contexts/MovieContext";

const Home = () => {
  const {
    movies,
    updateMovieList,
    appendMovies,
    lastSearch,
    filters,
    loading,
    setLoading,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useMovieContext();
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);

  const fetchMovies = async (
    searchTerm = "",
    pageNum = 1,
    isAppend = false
  ) => {
    try {
      setLoading(true);
      setError(null);
      setIsSearching(Boolean(searchTerm));

      let data;
      if (searchTerm) {
        data = await searchMovies(searchTerm, pageNum);
      } else if (filters.genre || filters.year || filters.rating) {
        data = await getFilteredMovies(filters, pageNum);
      } else {
        data = await getTrendingMovies();
      }

      if (isAppend) {
        appendMovies(data);
      } else {
        updateMovieList(data);
      }

      setHasMoreMovies(data.page < data.total_pages);
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lastSearch) {
      fetchMovies(lastSearch);
    } else {
      fetchMovies();
    }
  }, [filters]); // Re-fetch when filters change

  const handleSearch = (searchTerm) => {
    fetchMovies(searchTerm);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(lastSearch, nextPage, true);
  };

  const handleApplyFilters = () => {
    // This will trigger the useEffect to fetch with new filters
    fetchMovies();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={1} sx={{ p: 3, mb: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Movie Explorer
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Discover Your Favorite Films
        </Typography>

        <SearchBar onSearch={handleSearch} />
      </Paper>

      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <FilterBar onApplyFilters={handleApplyFilters} />
        </Grid>

        <Grid item xs={12} md={9} lg={10}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="h2">
              {isSearching
                ? `Search Results for "${lastSearch}"`
                : filters.genre || filters.year || filters.rating
                ? "Filtered Movies"
                : "Trending Movies"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movies.length > 0
                ? `${movies.length} movie${movies.length !== 1 ? "s" : ""}`
                : ""}
            </Typography>
          </Box>

          {movies.length === 0 && !loading ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              No movies found. Try different search terms or filters.
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {movies.map((movie) => (
                <Grid
                  item
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  key={movie.id}
                >
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
          )}

          {hasMoreMovies && movies.length > 0 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant="outlined"
                onClick={handleLoadMore}
                disabled={loading}
                size="large"
              >
                {loading ? <CircularProgress size={24} /> : "Load More"}
              </Button>
            </Box>
          )}

          {loading && movies.length === 0 && (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;