import { CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { theme } from '@pagopa/mui-italia';
import { it } from 'date-fns/locale';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { UserContextProvider } from './contexts/UserContextProvider';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import { loadConfiguration } from './services/configuration.service';
import { initAmplify } from './Authentication/auth';

async function doTheRender() {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  try {
    // load config from JSON file
    await loadConfiguration();
    await initAmplify();

    root.render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* for date formatting in italian style */}
          <LocalizationProvider adapterLocale={it} dateAdapter={AdapterDateFns}>
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
  } catch (e) {
    console.error(e);

    root.render(
      <div style={{ fontSize: 20, marginLeft: '2rem' }}>
        Problems loading configuration - see console
      </div>
    );
  }
}

// actual launching of the React app
void doTheRender();
