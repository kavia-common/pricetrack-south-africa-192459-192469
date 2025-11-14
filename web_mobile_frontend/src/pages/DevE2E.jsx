import React, { useState } from "react";
import { API_BASE_URL, signup, login, getCurrentUser, fetchWishlists } from "../api/client";

/**
 * PUBLIC_INTERFACE
 * DevE2E page: simple controls to exercise signup -> login -> me -> wishlists.
 */
export default function DevE2E() {
  const [email, setEmail] = useState("user@example.com");
  const [displayName, setDisplayName] = useState("Lebo");
  const [log, setLog] = useState([]);

  function append(msg, obj) {
    setLog((prev) => [...prev, `${msg}${obj ? ": " + JSON.stringify(obj) : ""}`]);
  }

  const doSignup = async () => {
    try {
      const res = await signup(email, displayName);
      append("Signup OK", res);
    } catch (e) {
      append("Signup ERR", { message: e.message });
    }
  };

  const doLogin = async () => {
    try {
      const res = await login(email);
      append("Login OK", res);
    } catch (e) {
      append("Login ERR", { message: e.message });
    }
  };

  const doMe = async () => {
    try {
      const res = await getCurrentUser();
      append("Me OK", res);
    } catch (e) {
      append("Me ERR", { message: e.message });
    }
  };

  const doWishlists = async () => {
    try {
      const res = await fetchWishlists();
      append("Wishlists OK", res);
    } catch (e) {
      append("Wishlists ERR", { message: e.message });
    }
  };

  const clearToken = () => {
    localStorage.removeItem("accessToken");
    append("Token cleared");
  };

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h2>Dev E2E</h2>
      <p>API Base URL: {API_BASE_URL}</p>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 8, minWidth: 280 }}
        />
        <input
          type="text"
          placeholder="display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          style={{ padding: 8, minWidth: 200 }}
        />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <button onClick={doSignup}>Signup</button>
        <button onClick={doLogin}>Login</button>
        <button onClick={doMe}>Get Me (protected)</button>
        <button onClick={doWishlists}>Fetch Wishlists (protected)</button>
        <button onClick={clearToken}>Clear Token</button>
      </div>

      <pre style={{ background: "#f3f4f6", padding: 12, borderRadius: 8, maxHeight: 320, overflow: "auto" }}>
        {log.join("\n")}
      </pre>
    </div>
  );
}
