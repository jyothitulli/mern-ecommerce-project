import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminAPI.listUsers();
      setUsers(res.data.data || res.data || []);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await adminAPI.deleteUser(id);
      await load();
    } catch (e) {
      alert(e.response?.data?.message || e.message || 'Failed to delete user');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left border-b">Name</th>
              <th className="p-2 text-left border-b">Email</th>
              <th className="p-2 text-left border-b">Role</th>
              <th className="p-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-2 border-b">{u.name}</td>
                <td className="p-2 border-b">{u.email}</td>
                <td className="p-2 border-b"><span className="px-2 py-1 text-xs rounded bg-gray-100">{u.role || 'user'}</span></td>
                <td className="p-2 border-b">
                  <button className="px-3 py-1 text-sm border rounded mr-2" disabled>Edit</button>
                  <button onClick={() => handleDelete(u.id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-600">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
