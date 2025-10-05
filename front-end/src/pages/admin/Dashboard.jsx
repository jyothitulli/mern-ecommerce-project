import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome to the admin panel. Choose a section to manage.</p>
      <div className="flex gap-4">
        <Link to="/admin/products" className="px-4 py-2 bg-black text-white rounded">Manage Products</Link>
        <Link to="/admin/users" className="px-4 py-2 bg-gray-800 text-white rounded">Manage Users</Link>
      </div>
    </div>
  );
}