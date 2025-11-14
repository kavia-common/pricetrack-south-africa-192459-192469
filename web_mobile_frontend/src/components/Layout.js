import React from 'react';
import Nav from './Nav';

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      <main className="container" style={{ paddingTop: '1rem' }}>
        {children}
      </main>
    </div>
  );
}
