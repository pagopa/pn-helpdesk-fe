import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SnackbarComponent from "./components/snackbar/SnackbarComponent";
import Router from "./navigation/Router";
import { opened } from "./redux/spinnerSlice";

function App() {
  const openedSpinner = useSelector(opened);

  return (
    <div data-testid="App">
      <BrowserRouter>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openedSpinner}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Router />
        <SnackbarComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
