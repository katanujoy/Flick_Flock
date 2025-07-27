import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Divider,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import { ArrowBack, Favorite, FavoriteBorder, Star } from "@mui/icons-material";
import { getMovieDetails } from "../services/movieApi";
import { useMovieContext } from "../contexts/MovieContext";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useMovieContext();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again later.");
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!movie) return null;

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "placeholder-image-url";

  // Find YouTube trailer if available
  const trailer =
    movie.videos?.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    ) || movie.videos?.[0];

  // Get top cast members
  const cast = movie.credits?.cast?.slice(0, 10) || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item size={{ xs: 12, md: 4 }}>
            <Box
              component="img"
              src={imageUrl}
              alt={movie.title}
              sx={{
                width: "100%",
                borderRadius: 1,
                boxShadow: 3,
              }}
            />

            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={() => toggleFavorite(movie)}
                color="primary"
                sx={{ mr: 1 }}
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              {movie.vote_average > 0 && (
                <Chip
                  icon={<Star />}
                  label={movie.vote_average.toFixed(1)}
                  color="secondary"
                />
              )}
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Release Date:
              </Typography>
              <Typography variant="body2" gutterBottom>
                {new Date(movie.release_date).toLocaleDateString()}
              </Typography>

              {movie.runtime > 0 && (
                <>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Runtime:
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </Typography>
                </>
              )}

              {movie.production_companies?.length > 0 && (
                <>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Production:
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {movie.production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
          <Grid item size={{ xs: 12, md: 8 }}>
            <Typography variant="h4" gutterBottom>
              {movie.title}
              {movie.release_date && (
                <Typography
                  variant="h6"
                  component="span"
                  color="text.secondary"
                >
                  {" "}
                  ({new Date(movie.release_date).getFullYear()})
                </Typography>
              )}
            </Typography>

            <Box sx={{ mb: 2 }}>
              {movie.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>

            <Typography variant="body1" paragraph>
              {movie.tagline && (
                <Typography variant="subtitle1" fontStyle="italic" gutterBottom>
                  "{movie.tagline}"
                </Typography>
              )}
              {movie.overview}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ width: "100%" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                indicatorColor="secondary"
                textColor="inherit"
              >
                {trailer && <Tab label="Trailer" />}
                {cast.length > 0 && <Tab label="Cast" />}
                <Tab label="Details" />
              </Tabs>

              {trailer && (
                <TabPanel value={tabValue} index={0}>
                  <Box
                    sx={{
                      position: "relative",
                      paddingBottom: "56.25%", // 16:9 aspect ratio
                      height: 0,
                      overflow: "hidden",
                      borderRadius: 1,
                      "& iframe": {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      },
                    }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title="Movie Trailer"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </Box>
                </TabPanel>
              )}

              <TabPanel value={tabValue} index={trailer ? 1 : 0}>
                <Grid container spacing={2}>
                  {cast.map((person) => (
                    <Grid item size={{ xs: 6, sm: 4, md: 3 }} key={person.id}>
                      <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Avatar
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                              : ""
                          }
                          alt={person.name}
                          sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}
                        />
                        <Typography variant="subtitle2" component="div" noWrap>
                          {person.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {person.character}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              <TabPanel
                value={tabValue}
                index={
                  trailer ? (cast.length > 0 ? 2 : 1) : cast.length > 0 ? 1 : 0
                }
              >
                <Grid container spacing={3}>
                  {movie.budget > 0 && (
                    <Grid item size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Budget:
                      </Typography>
                      <Typography variant="body2">
                        ${movie.budget.toLocaleString()}
                      </Typography>
                    </Grid>
                  )}

                  {movie.revenue > 0 && (
                    <Grid item size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Revenue:
                      </Typography>
                      <Typography variant="body2">
                        ${movie.revenue.toLocaleString()}
                      </Typography>
                    </Grid>
                  )}

                  {movie.original_language && (
                    <Grid item size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Original Language:
                      </Typography>
                      <Typography variant="body2">
                        {movie.original_language.toUpperCase()}
                      </Typography>
                    </Grid>
                  )}

                  {movie.status && (
                    <Grid item size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Status:
                      </Typography>
                      <Typography variant="body2">{movie.status}</Typography>
                    </Grid>
                  )}
                </Grid>
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MovieDetails;