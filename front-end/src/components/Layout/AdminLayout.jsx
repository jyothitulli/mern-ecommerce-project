
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: 220,
          padding: 16,
          borderRight: '1px solid #eee',
          backgroundColor: 'white', // ✅ white background
        }}
      >
        <h2 style={{ marginBottom: 12, color: '#ea2e0e' }}>Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Dashboard', 'Products', 'Users'].map((item, i) => (
            <NavLink
              key={i}
              to={`/admin${item === 'Dashboard' ? '' : '/' + item.toLowerCase()}`}
              style={{
                color: 'black',
                textDecoration: 'none',
                padding: '6px 0',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#ea2e0e')}
              onMouseLeave={(e) => (e.target.style.color = 'black')}
            >
              {item}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}

