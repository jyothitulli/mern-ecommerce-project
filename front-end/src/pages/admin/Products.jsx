// import React, { useEffect, useState } from 'react';
// import { adminAPI } from '../../utils/api';

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const load = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const res = await adminAPI.listProducts();
//       setProducts(res.data.data || res.data || []);
//     } catch (e) {
//       setError(e.response?.data?.message || e.message || 'Failed to load products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!confirm('Delete this product?')) return;
//     try {
//       await adminAPI.deleteProduct(id);
//       await load();
//     } catch (e) {
//       alert(e.response?.data?.message || e.message || 'Failed to delete product');
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">Products</h1>
//         {/* Placeholder for Add Product feature */}
//         {/* <button className="px-4 py-2 bg-black text-white rounded">Add Product</button> */}
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-600 mb-3">{error}</p>}

//       <div className="overflow-auto">
//         <table className="min-w-full border border-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="p-2 text-left border-b">Name</th>
//               <th className="p-2 text-left border-b">SKU</th>
//               <th className="p-2 text-left border-b">Price</th>
//               <th className="p-2 text-left border-b">Category</th>
//               <th className="p-2 text-left border-b">Gender</th>
//               <th className="p-2 text-left border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr key={p.id} className="odd:bg-white even:bg-gray-50">
//                 <td className="p-2 border-b">{p.name}</td>
//                 <td className="p-2 border-b">{p.sku}</td>
//                 <td className="p-2 border-b">
//                     ${p.discountPrice != null ? `$${Number(p.discountPrice).toFixed(2)}` : p.price != null
//       ? `$${Number(p.price).toFixed(2)}`
//       : "N/A"}</td>
//                 <td className="p-2 border-b">{p.category}</td>
//                 <td className="p-2 border-b">{p.gender}</td>
//                 <td className="p-2 border-b">
//                   <button className="px-3 py-1 text-sm border rounded mr-2" disabled>Edit</button>
//                   <button onClick={() => handleDelete(p.id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded">Delete</button>
//                 </td>
//               </tr>
//             ))}
//             {products.length === 0 && !loading && (
//               <tr>
//                 <td colSpan={6} className="p-4 text-center text-gray-600">No products found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../utils/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // product being edited
  const [form, setForm] = useState({ name: '', price: '', discountPrice: '', category: '', gender: '', countInStock: '' });

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminAPI.listProducts();
      setProducts(res.data.data || res.data || []);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name || '',
      price: p.price ?? '',
      discountPrice: p.discountPrice ?? '',
      category: p.category || '',
      gender: p.gender || '',
      countInStock: p.countInStock ?? ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (!editing) return;
    try {
      const payload = {
        name: form.name,
        category: form.category,
        gender: form.gender,
      };
      if (form.price !== '') payload.price = Number(form.price);
      if (form.discountPrice !== '') payload.discountPrice = Number(form.discountPrice);
      if (form.countInStock !== '') payload.countInStock = parseInt(form.countInStock, 10);

      await adminAPI.updateProduct(editing.id, payload);
      setEditing(null);
      await load();
    } catch (e) {
      alert(e.response?.data?.message || e.message || 'Failed to update product');
    }
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await adminAPI.deleteProduct(id);
      await load();
    } catch (e) {
      alert(e.response?.data?.message || e.message || 'Failed to delete product');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        {/* Placeholder for Add Product feature */}
        {/* <button className="px-4 py-2 bg-black text-white rounded">Add Product</button> */}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left border-b">Name</th>
              <th className="p-2 text-left border-b">SKU</th>
              <th className="p-2 text-left border-b">Price</th>
              <th className="p-2 text-left border-b">Category</th>
              <th className="p-2 text-left border-b">Gender</th>
              <th className="p-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-2 border-b">{p.name}</td>
                <td className="p-2 border-b">{p.sku}</td>
                <td className="p-2 border-b">
                    ${p.discountPrice != null ? `$${Number(p.discountPrice).toFixed(2)}` : p.price != null
      ? `$${Number(p.price).toFixed(2)}`
      : "N/A"}</td>
                <td className="p-2 border-b">{p.category}</td>
                <td className="p-2 border-b">{p.gender}</td>
                <td className="p-2 border-b">
                  <button onClick={() => startEdit(p)} className="px-3 py-1 text-sm border rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-600">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-lg p-4 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-3">Edit Product</h2>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col text-sm">Name
                <input name="name" value={form.name} onChange={handleEditChange} className="border p-2 rounded" />
              </label>
              <label className="flex flex-col text-sm">Category
                <input name="category" value={form.category} onChange={handleEditChange} className="border p-2 rounded" />
              </label>
              <label className="flex flex-col text-sm">Gender
                <input name="gender" value={form.gender} onChange={handleEditChange} className="border p-2 rounded" />
              </label>
              <label className="flex flex-col text-sm">Price
                <input name="price" type="number" step="0.01" value={form.price} onChange={handleEditChange} className="border p-2 rounded" />
              </label>
              <label className="flex flex-col text-sm">Discount Price
                <input name="discountPrice" type="number" step="0.01" value={form.discountPrice} onChange={handleEditChange} className="border p-2 rounded" />
              </label>
              <label className="flex flex-col text-sm">Count In Stock
                <input name="countInStock" type="number" value={form.countInStock} onChange={handleEditChange} className="border p-2 rounded" />
              </label>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={cancelEdit} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={saveEdit} className="px-4 py-2 bg-black text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}