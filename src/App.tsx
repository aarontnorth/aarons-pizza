import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import OrderHistory from './pages/OrderHistory';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from './contexts/AuthContext';
import {RedirectRoute} from './components/RedirectRoute';
import {SnackBarProvider} from './contexts/SnackBarContext';
import {OrderProvider} from './contexts/OrderContext';
import {SearchProvider} from './contexts/SearchContext';

const theme = createTheme({
  palette: {
    background: {
      default: '#054c81'
    },
    text: {
      primary: '#ffffff'
    }
  },
});

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SnackBarProvider>
        <AuthProvider>
          <OrderProvider>
            <SearchProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                      <RedirectRoute>
                        <Home />
                      </RedirectRoute>}
                    />
                    <Route path="/order" element={
                      <RedirectRoute>
                        <Order />
                      </RedirectRoute>}
                    />
                    <Route path="/order-history" element={
                      <RedirectRoute>
                        <OrderHistory />
                      </RedirectRoute>}
                    />
                  </Routes>
                </BrowserRouter>
              </ThemeProvider>
            </SearchProvider>
          </OrderProvider>
        </AuthProvider>
      </SnackBarProvider>
    </QueryClientProvider>
  );
}

export default App;
