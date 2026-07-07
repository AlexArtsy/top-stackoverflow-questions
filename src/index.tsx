import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import store from './store/store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Provider store={store}>
        <App />
      </Provider>
    </LocalizationProvider>
  </StrictMode>
);
