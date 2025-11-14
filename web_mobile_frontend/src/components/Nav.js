import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const appName = process.env.REACT_APP_APP_NAME || 'PriceTrack SA';

// PUBLIC_INTERFACE
export default function Nav() {
  /** Top navigation bar for main sections and auth actions. */
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <span style={{
            width: 12, height: 12, background: 'linear-gradient(135deg, #2563EB, #F59E0B)',
            display: 'inline-block', borderRadius: 4
          }} />
          {appName}
        </div>
        {isAuthenticated && (
          <>
            <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/dashboard">Dashboard</NavLink>
            <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/wishlist">Wishlist</NavLink>
            <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/search">Search</NavLink>
            <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/insights">Black Friday</NavLink>
            <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/settings">Settings</NavLink>
          </>
        )}
        <div className="nav-links">
          {!isAuthenticated ? (
            <>
              <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/login">Login</NavLink>
              <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/signup">Sign up</NavLink>
            </>
          ) : (
            <button className="btn btn-secondary" onClick={onLogout}>
              {user?.name ? `Logout ${user.name.split(' ')[0]}` : 'Logout'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
