import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { theme } from "@pagopa/mui-italia";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { it } from "date-fns/locale";
import { UserContextProvider } from "./contexts/UserContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* for date formatting in italian style */}
        <LocalizationProvider locale={it} dateAdapter={AdapterDateFns}>
          <UserContextProvider>
            <CssBaseline />
            <Suspense fallback="loading...">
              <App />
            </Suspense>
          </UserContextProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
