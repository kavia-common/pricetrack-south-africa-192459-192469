const ACCESS_KEY = 'pt_access_token';
const REFRESH_KEY = 'pt_refresh_token';

// PUBLIC_INTERFACE
export function getAccessToken() {
  /** Returns the stored JWT access token string or null. */
  return localStorage.getItem(ACCESS_KEY);
}

// PUBLIC_INTERFACE
export function getRefreshToken() {
  /** Returns the stored refresh token string or null. */
  return localStorage.getItem(REFRESH_KEY);
}

// PUBLIC_INTERFACE
export function setTokens(accessToken, refreshToken) {
  /** Sets access and refresh tokens, preserving previous values if not provided. */
  if (accessToken) localStorage.setItem(ACCESS_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
}

// PUBLIC_INTERFACE
export function clearTokens() {
  /** Clears access and refresh tokens from storage. */
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}
