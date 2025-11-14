import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DevE2E from "./pages/DevE2E";

/**
 * PUBLIC_INTERFACE
 * Minimal app shell that exposes /dev-e2e for manual integration testing.
 */
export default function App() {
  const appName = process.env.REACT_APP_APP_NAME || "PriceTrack SA";
  return (
    <BrowserRouter>
      <div style={{ padding: 16, fontFamily: "Inter, system-ui, sans-serif" }}>
        <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <h1 style={{ margin: 0 }}>{appName}</h1>
          <nav style={{ display: "flex", gap: 12 }}>
            <Link to="/">Home</Link>
            <Link to="/dev-e2e">Dev E2E</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<div>Welcome to {appName}. Open /dev-e2e to test integration.</div>} />
          <Route path="/dev-e2e" element={<DevE2E />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
