import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';

// PUBLIC_INTERFACE
export default function Signup() {
  /** Signup screen for new users. */
  const { signup } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await signup(form);
      nav('/dashboard');
    } catch (err) {
      setError('Sign up failed. Please check your details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container" style={{ maxWidth: 460 }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <h2 style={{ margin: 0, marginBottom: 10 }}>Create your account</h2>
          <p style={{ color: '#6B7280', marginTop: 0 }}>Start tracking and comparing prices today.</p>
          {error && <div style={{ color: '#EF4444', marginBottom: 8 }}>{error}</div>}
          <form onSubmit={onSubmit}>
            <label>Name</label>
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <div style={{ height: 10 }} />
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
              {submitting ? 'Creating...' : 'Create account'}
            </button>
          </form>
          <div style={{ marginTop: 12, fontSize: 14 }}>
            Already have an account? <Link to="/login" style={{ color: '#2563EB' }}>Log in</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
