import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login screen for existing users. */
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(form.email, form.password);
      nav('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container" style={{ maxWidth: 460 }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <h2 style={{ margin: 0, marginBottom: 10 }}>Welcome back</h2>
          <p style={{ color: '#6B7280', marginTop: 0 }}>Sign in to track and compare prices.</p>
          {error && <div style={{ color: '#EF4444', marginBottom: 8 }}>{error}</div>}
          <form onSubmit={onSubmit}>
            <label>Email</label>
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <div style={{ height: 10 }} />
            <label>Password</label>
            <input
              className="input"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <div style={{ height: 16 }} />
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <div style={{ marginTop: 12, fontSize: 14 }}>
            New here? <Link to="/signup" style={{ color: '#2563EB' }}>Create an account</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
