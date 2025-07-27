import { useState } from 'react';
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useMovieContext } from '../contexts/MovieContext';

const SearchBar = ({ onSearch }) => {
  const { lastSearch, setLastSearch } = useMovieContext();
  const [searchTerm, setSearchTerm] = useState(lastSearch);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLastSearch(searchTerm);
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setLastSearch('');
    onSearch('');
  };

  return (
    <Box component="form" onSubmit={handleSearch}>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 600,
          margin: '0 auto',
          mb: 3
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <IconButton 
            type="button" 
            sx={{ p: '10px' }} 
            aria-label="clear"
            onClick={handleClear}
          >
            <Clear />
          </IconButton>
        )}
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <Search />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;