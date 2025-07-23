import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Slider,
  Typography,
  Chip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterList, Close, ExpandMore } from "@mui/icons-material";
import { useMovieContext } from "../contexts/MovieContext";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const FilterBar = ({ onApplyFilters }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { genres, filters, updateFilters, resetFilters } = useMovieContext();
  const [localFilters, setLocalFilters] = useState({ ...filters });
  const [expanded, setExpanded] = useState(false);

  const handleFilterChange = (name, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    updateFilters(localFilters);
    if (onApplyFilters) onApplyFilters(localFilters);
    setExpanded(false);
  };

  const handleResetFilters = () => {
    resetFilters();
    setLocalFilters({ genre: "", year: "", rating: "" });
    if (onApplyFilters) onApplyFilters({ genre: "", year: "", rating: "" });
    setExpanded(false);
  };

  // Show active filters
  const activeFilters = [];
  if (filters.genre) {
    const genreName =
      genres.find((g) => g.id === filters.genre)?.name || "Genre";
    activeFilters.push(`${genreName}`);
  }
  if (filters.year) activeFilters.push(`Year: ${filters.year}`);
  if (filters.rating) activeFilters.push(`${filters.rating}+ Rating`);

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {activeFilters.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {activeFilters.map((filter, index) => (
              <Chip
                key={index}
                label={filter}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
            <Chip
              label="Clear All"
              size="small"
              onDelete={handleResetFilters}
              color="secondary"
            />
          </Box>
        )}
      </Box>

      {/* Filter Accordion */}
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        sx={{ mb: 2 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter-panel-content"
          id="filter-panel-header"
        >
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <FilterList sx={{ mr: 1 }} />
            Filters
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item size={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                  labelId="genre-label"
                  id="genre-select"
                  value={localFilters.genre}
                  label="Genre"
                  onChange={(e) => handleFilterChange("genre", e.target.value)}
                >
                  <MenuItem value="">
                    <em>All Genres</em>
                  </MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item size={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="year-label">Release Year</InputLabel>
                <Select
                  labelId="year-label"
                  id="year-select"
                  value={localFilters.year}
                  label="Release Year"
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                >
                  <MenuItem value="">
                    <em>All Years</em>
                  </MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item size={12}>
              <Typography gutterBottom>Minimum Rating</Typography>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={localFilters.rating || 0}
                  onChange={(_, value) => handleFilterChange("rating", value)}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={10}
                />
              </Box>
            </Grid>

            <Grid
              item
              size={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <Button onClick={handleResetFilters} color="secondary">
                Reset
              </Button>
              <Button
                onClick={handleApplyFilters}
                color="primary"
                variant="contained"
              >
                Apply Filters
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterBar;