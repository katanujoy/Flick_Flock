import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorder, Star } from "@mui/icons-material";
import { useMovieContext } from "../contexts/MovieContext";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { favorites, toggleFavorite } = useMovieContext();
  const navigate = useNavigate();

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "placeholder-image-url";

  return (
    <Card
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "scale(1.03)",
          transition: "transform 0.2s ease-in-out",
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={imageUrl}
        alt={movie.title}
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/movie/${movie.id}`)}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(movie.release_date).getFullYear()}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Star sx={{ color: "gold", fontSize: "1rem", mr: 0.5 }} />
            {movie.vote_average.toFixed(1)}
          </Typography>
          <IconButton
            sx={{ ml: "auto" }}
            onClick={() => toggleFavorite(movie)}
            color="primary"
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;