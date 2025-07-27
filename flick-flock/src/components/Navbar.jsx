import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  AccountCircle,
  Menu as MenuIcon,
  Favorite,
  Home as HomeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode, user, logout } = useMovieContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      <ListItem
        button
        onClick={() => {
          navigate("/");
          setMobileOpen(false);
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          navigate("/favorites");
          setMobileOpen(false);
        }}
      >
        <ListItemIcon>
          <Favorite />
        </ListItemIcon>
        <ListItemText primary="Favorites" />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="div"
          sx={{ cursor: "pointer", fontSize: isMobile ? "1.1rem" : "1.5rem" }}
          onClick={() => navigate("/")}
        >
          Flick-Flock
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          onClick={toggleDarkMode}
          sx={{ mr: 2 }}
          aria-label="toggle dark mode"
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {isMobile && !user && (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}

        {!isMobile && (
          <Button
            color="inherit"
            onClick={() => navigate("/favorites")}
            sx={{ mr: 2 }}
          >
            Favorites
          </Button>
        )}

        {user ? (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>{user.username}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          !isMobile && (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          )
        )}
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;