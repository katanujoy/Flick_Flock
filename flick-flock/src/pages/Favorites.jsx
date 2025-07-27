import { Container, Grid, Typography, Paper, Button } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";

const Favorites = () => {
  const { favorites } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={1} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Your Favorites Collection
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            No favorite movies yet. Start adding some!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.history.back()}
          >
            Browse Movies
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Favorite Movies
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {favorites.length} {favorites.length === 1 ? "movie" : "movies"} in
          your collection
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {favorites.map((movie) => (
          <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;