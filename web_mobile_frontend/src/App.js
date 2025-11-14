import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/theme.css';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Wishlist from './pages/Wishlist';
import ProductSearch from './pages/ProductSearch';
import ProductDetails from './pages/ProductDetails';
import BlackFridayInsights from './pages/BlackFridayInsights';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';

// PUBLIC_INTERFACE
function App() {
  /** Root application component that sets theme and routing. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <button
            className="theme-toggle"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/search" element={<ProductSearch />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/insights" element={<BlackFridayInsights />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<div className="container">Not found</div>} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
