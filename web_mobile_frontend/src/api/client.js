//
// PUBLIC_INTERFACE
// API client configured with base URL from environment variables.
// Exposes helper methods for auth and protected requests.
//
const baseURL =
  process.env.REACT_APP_API_BASE_URL ||
  (typeof window !== "undefined" ? `${window.location.origin.replace(":3000", ":8080")}` : "http://localhost:8080");

// Simple wrapper around fetch to include Authorization when token is available.
function getAuthHeader() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// PUBLIC_INTERFACE
export async function apiGet(path) {
  const res = await fetch(`${baseURL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function apiPost(path, body) {
  const res = await fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function signup(email, displayName) {
  /** Signup and store token in localStorage. */
  const data = await apiPost("/auth/signup", { email, displayName });
  if (data?.accessToken) localStorage.setItem("accessToken", data.accessToken);
  return data;
}

// PUBLIC_INTERFACE
export async function login(email) {
  /** Login and store token in localStorage. */
  const data = await apiPost("/auth/login", { email });
  if (data?.accessToken) localStorage.setItem("accessToken", data.accessToken);
  return data;
}

// PUBLIC_INTERFACE
export async function getCurrentUser() {
  /** Fetch profile of current user using stored token. */
  return apiGet("/users/me");
}

// PUBLIC_INTERFACE
export async function fetchWishlists() {
  /** Fetch current user's wishlists. */
  return apiGet("/wishlists");
}

export const API_BASE_URL = baseURL;
