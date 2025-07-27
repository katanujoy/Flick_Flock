import { Snackbar, Alert } from "@mui/material";
import { useMovieContext } from "../contexts/MovieContext";

const AlertSnackbar = () => {
  const { snackbar, closeSnackbar } = useMovieContext();

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;