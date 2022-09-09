import { ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoute from './features/auth/components/PrivateRoute';
import HomePage from './pages/Home.page';
import RegisterPage from './pages/Register.page';
import SigninPage from './pages/Signin.page';
import { store } from './store';
import { theme } from './shared/utils/theme';
import CartPage from './pages/Cart.page';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute page={<HomePage />} />} />
          <Route path="/cart" element={<PrivateRoute page={<CartPage />} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

type CypressWindow = Window & typeof globalThis & { Cypress: any; store: any };

const thisWindow = window as CypressWindow;

if (thisWindow.Cypress) {
  console.log('CYPRESS WINDOW');

  thisWindow.store = store;
}

export default App;
