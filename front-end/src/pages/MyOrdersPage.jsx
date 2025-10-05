
// import React, { useEffect, useState } from 'react';
// import { useApp } from '../context/AppContext';
// import { Link } from 'react-router-dom';
// import { ordersAPI } from '../utils/api';

// const MyOrdersPage = () => {
//   const { user, orders } = useApp();

//   // Local state for interactions
//   const [expanded, setExpanded] = useState({}); // { [orderId]: boolean }
//   const [myOrders, setMyOrders] = useState([]); // local view of user's orders
//   const [reviewModal, setReviewModal] = useState({ open: false, order: null, itemKey: '', rating: 5, comment: '' });

//   // Filter orders for the current user and keep a local copy we can refresh
//   const userOrders = orders.filter(order => order.userId === user?.id);
//   useEffect(() => {
//     setMyOrders(userOrders);
//   }, [userOrders]);

//   // Mock orders data (keeping for fallback/demo)
//   const mockOrders = [
//     {
//       id: 'ORD-001',
//       date: '2024-01-15',
//       status: 'Delivered',
//       total: 129.98,
//       items: [
//         {
//           id: 1,
//           name: 'Classic Oxford Button-Down Shirt',
//           size: 'M',
//           color: 'Blue',
//           quantity: 1,
//           price: 34.99,
//           image: 'https://picsum.photos/100/100?random=39'
//         },
//         {
//           id: 2,
//           name: 'Slim-Fit Stretch Shirt',
//           size: 'L',
//           color: 'Black',
//           quantity: 2,
//           price: 24.99,
//           image: 'https://picsum.photos/100/100?random=41'
//         }
//       ]
//     },
//     {
//       id: 'ORD-002',
//       date: '2024-01-20',
//       status: 'Processing',
//       total: 89.97,
//       items: [
//         {
//           id: 3,
//           name: 'High-Waist Skinny Jeans',
//           size: 'S',
//           color: 'Dark Blue',
//           quantity: 1,
//           price: 45.00,
//           image: 'https://picsum.photos/100/100?random=19'
//         },
//         {
//           id: 4,
//           name: 'Casual T-Shirt',
//           size: 'M',
//           color: 'White',
//           quantity: 2,
//           price: 20.00,
//           image: 'https://picsum.photos/100/100?random=31'
//         }
//       ]
//     }
//   ];

//   const getStatusColor = (status) => {
//     if (!status) return 'bg-gray-100 text-gray-800';
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return 'bg-green-100 text-green-800';
//       case 'processing':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'shipped':
//         return 'bg-blue-100 text-blue-800';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   if (!user) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
//           <p className="text-gray-600 mb-6">You need to be logged in to view your orders.</p>
//           <Link 
//             to="/login" 
//             className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
//           >
//             Log In
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Actions
//   const toggleExpand = (orderId) => {
//     setExpanded((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
//   };

//   const handleCancel = async (order) => {
//     if (!order?.id) return;
//     if (!confirm('Are you sure you want to cancel this order?')) return;
//     try {
//       await ordersAPI.updateStatus(order.id, 'Cancelled');
//       // Refresh local orders from API
//       const res = await ordersAPI.getAll();
//       setMyOrders(res.data.data || []);
//     } catch (e) {
//       alert(e.response?.data?.message || e.message || 'Failed to cancel order');
//     }
//   };

//   const openReview = (order) => {
//     // build item options: prefer sku, fallback to name index
//     const firstKey = (order.items?.[0]?.sku) || (order.items?.[0]?.name ? `name:${order.items[0].name}` : '');
//     setReviewModal({ open: true, order, itemKey: firstKey, rating: 5, comment: '' });
//   };
//   const closeReview = () => setReviewModal({ open: false, order: null, itemKey: '', rating: 5, comment: '' });
//   const submitReview = () => {
//     try {
//       const o = reviewModal.order;
//       const key = reviewModal.itemKey || 'unknown';
//       const storeKey = 'my_reviews';
//       const existing = JSON.parse(localStorage.getItem(storeKey) || '{}');
//       const entry = {
//         rating: Number(reviewModal.rating) || 0,
//         comment: reviewModal.comment || '',
//         orderId: o?.id,
//         createdAt: new Date().toISOString(),
//       };
//       existing[key] = existing[key] || [];
//       existing[key].push(entry);
//       localStorage.setItem(storeKey, JSON.stringify(existing));
//       alert('Thanks for your review!');
//       closeReview();
//     } catch (e) {
//       alert('Failed to save review locally.');
//     }
//   };

//   const displayOrders = [...myOrders, ...mockOrders];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
//         <p className="text-gray-600">Track and manage your orders</p>
//       </div>

//       {/* Use real orders if available, otherwise show mock orders for demo */}
//       {(userOrders.length === 0 && mockOrders.length === 0) ? (
//         <div className="text-center py-12">
//           <div className="max-w-md mx-auto">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">
//               No orders yet
//             </h2>
//             <p className="text-gray-600 mb-6">
//               When you place your first order, it will appear here.
//             </p>
//             <Link 
//               to="/" 
//               className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
//             >
//               Start Shopping
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {/* Display real orders first, then mock orders */}
//           {displayOrders.map((order) => (
//             <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
//               {/* Order Header */}
//               <div className="flex justify-between items-center mb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold">Order #{order.id}</h3>
//                   <p className="text-sm text-gray-600">
//                     Placed on {new Date(order.createdAt || order.date || Date.now()).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
//                     {order.status}
//                   </span>
//                   <p className="text-lg font-bold mt-1">${order.total.toFixed(2)}</p>
//                 </div>
//               </div>

//               {/* Order Items */}
//               <div className="border-t pt-4">
//                 <h4 className="font-medium mb-3">Items ({order.items.length})</h4>
//                 <div className="space-y-3">
//                   {order.items.map((item) => (
//                     <div key={item.id} className="flex items-center gap-4">
//                       <img
//                         src={item.image || (item.images && item.images[0]?.url) || 'https://picsum.photos/100/100?random=placeholder'}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                       <div className="flex-1">
//                         <h5 className="font-medium text-sm">{item.name}</h5>
//                         <p className="text-sm text-gray-600">
//                           {item.selectedSize && `Size: ${item.selectedSize}`} 
//                           {item.size && `Size: ${item.size}`}
//                           {(item.selectedColor || item.color) && ` | Color: ${item.selectedColor || item.color}`}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           Quantity: {item.quantity}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
//                         <p className="text-sm text-gray-600">${item.price} each</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Order Actions */}
//               <div className="border-t pt-4 mt-4">
//                 <div className="flex flex-wrap gap-3">
//                   <button onClick={() => toggleExpand(order.id)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
//                     {expanded[order.id] ? 'Hide Details' : 'View Details'}
//                   </button>
//                   {(order.status || '').toLowerCase() === 'delivered' && (
//                     <button onClick={() => openReview(order)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
//                       Leave Review
//                     </button>
//                   )}
//                   {['processing','confirmed'].includes((order.status || '').toLowerCase()) && (
//                     <button onClick={() => handleCancel(order)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
//                       Cancel Order
//                     </button>
//                   )}
//                 </div>

//                 {expanded[order.id] && (
//                   <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                     <div className="p-3 bg-gray-50 rounded">
//                       <h5 className="font-medium mb-1">Shipping</h5>
//                       <p className="text-gray-700">{order.shippingAddress || 'N/A'}</p>
//                     </div>
//                     <div className="p-3 bg-gray-50 rounded">
//                       <h5 className="font-medium mb-1">Payment</h5>
//                       <p className="text-gray-700">{order.paymentMethod || 'N/A'}</p>
//                     </div>
//                     <div className="p-3 bg-gray-50 rounded">
//                       <h5 className="font-medium mb-1">Tracking</h5>
//                       <p className="text-gray-700">{order.trackingNumber || 'N/A'}</p>
//                       <p className="text-gray-700">ETA: {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : 'N/A'}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {/* Review Modal */}
//       {reviewModal.open && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-4">
//             <h3 className="text-xl font-semibold mb-3">Leave a Review</h3>
//             <div className="mb-3">
//               <label className="block text-sm font-medium mb-1">Product</label>
//               <select
//                 className="w-full border rounded p-2"
//                 value={reviewModal.itemKey}
//                 onChange={(e) => setReviewModal((prev) => ({ ...prev, itemKey: e.target.value }))}
//               >
//                 {(reviewModal.order?.items || []).map((it, idx) => {
//                   const key = it.sku || `name:${it.name || 'Item ' + (idx + 1)}`;
//                   const label = `${it.name || it.sku || 'Item ' + (idx + 1)}${it.sku ? ` (SKU: ${it.sku})` : ''}`;
//                   return (
//                     <option key={key} value={key}>{label}</option>
//                   );
//                 })}
//               </select>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <label className="flex flex-col text-sm">Rating
//                 <input
//                   type="number"
//                   min={1}
//                   max={5}
//                   value={reviewModal.rating}
//                   onChange={(e) => setReviewModal((prev) => ({ ...prev, rating: e.target.value }))}
//                   className="border p-2 rounded"
//                 />
//               </label>
//               <label className="flex flex-col text-sm col-span-2">Comment
//                 <textarea
//                   rows={4}
//                   value={reviewModal.comment}
//                   onChange={(e) => setReviewModal((prev) => ({ ...prev, comment: e.target.value }))}
//                   className="border p-2 rounded"
//                   placeholder="Share your experience..."
//                 />
//               </label>
//             </div>
//             <div className="mt-4 flex justify-end gap-2">
//               <button onClick={closeReview} className="px-4 py-2 border rounded">Close</button>
//               <button onClick={submitReview} className="px-4 py-2 bg-black text-white rounded">Submit</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrdersPage;
// import React, { useEffect, useState } from 'react';
// import { useApp } from '../context/AppContext';
// import { Link } from 'react-router-dom';
// import { ordersAPI } from '../utils/api';

// const MyOrdersPage = () => {
//   const { user, orders, setUser } = useApp();

//   const [activeTab, setActiveTab] = useState('orders'); // "orders" | "settings"
//   const [expanded, setExpanded] = useState({});
//   const [myOrders, setMyOrders] = useState([]);
//   const [reviewModal, setReviewModal] = useState({ open: false, order: null, itemKey: '', rating: 5, comment: '' });
//   const [settings, setSettings] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     address: user?.address || '',
//     phone: user?.phone || ''
//   });

//   // Filter user orders
//   const userOrders = orders.filter(o => o.userId === user?.id);
//   useEffect(() => {
//     setMyOrders(userOrders);
//   }, [userOrders]);

//   // Mock orders for fallback
//   const mockOrders = [
//     {
//       id: 'ORD-001',
//       date: '2024-01-15',
//       status: 'Delivered',
//       total: 129.98,
//       items: [
//         { id: 1, name: 'Classic Oxford Button-Down Shirt', size: 'M', color: 'Blue', quantity: 1, price: 34.99, image: 'https://picsum.photos/100/100?random=39' },
//         { id: 2, name: 'Slim-Fit Stretch Shirt', size: 'L', color: 'Black', quantity: 2, price: 24.99, image: 'https://picsum.photos/100/100?random=41' }
//       ]
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch ((status || '').toLowerCase()) {
//       case 'delivered': return 'bg-green-100 text-green-800';
//       case 'processing': return 'bg-yellow-100 text-yellow-800';
//       case 'shipped': return 'bg-blue-100 text-blue-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

//   const handleCancel = async (order) => {
//     if (!confirm('Are you sure you want to cancel this order?')) return;
//     try {
//       await ordersAPI.updateStatus(order.id, 'Cancelled');
//       const res = await ordersAPI.getAll();
//       setMyOrders(res.data.data || []);
//     } catch (e) {
//       alert('Failed to cancel order');
//     }
//   };

//   const openReview = (order) => {
//     const firstKey = order.items?.[0]?.sku || `name:${order.items?.[0]?.name}`;
//     setReviewModal({ open: true, order, itemKey: firstKey, rating: 5, comment: '' });
//   };
//   const closeReview = () => setReviewModal({ open: false, order: null, itemKey: '', rating: 5, comment: '' });

//   const submitReview = () => {
//     try {
//       const o = reviewModal.order;
//       const key = reviewModal.itemKey || 'unknown';
//       const storeKey = 'my_reviews';
//       const existing = JSON.parse(localStorage.getItem(storeKey) || '{}');
//       const entry = { rating: Number(reviewModal.rating), comment: reviewModal.comment, orderId: o?.id, createdAt: new Date().toISOString() };
//       existing[key] = existing[key] || [];
//       existing[key].push(entry);
//       localStorage.setItem(storeKey, JSON.stringify(existing));
//       alert('Thanks for your review!');
//       closeReview();
//     } catch {
//       alert('Failed to save review locally.');
//     }
//   };

//   const handleSettingsChange = (field, value) => {
//     setSettings(prev => ({ ...prev, [field]: value }));
//   };

//   const saveSettings = () => {
//     try {
//       const updatedUser = { ...user, ...settings };
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//       setUser(updatedUser);
//       alert('Settings updated successfully!');
//     } catch (e) {
//       alert('Failed to save settings.');
//     }
//   };

//   if (!user) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
//         <p className="text-gray-600 mb-6">You need to be logged in to view this page.</p>
//         <Link to="/login" className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">Log In</Link>
//       </div>
//     );
//   }

//   const displayOrders = [...myOrders, ...mockOrders];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Tabs */}
//       <div className="flex gap-4 mb-6 border-b pb-2">
//         <button
//           className={`px-4 py-2 font-medium ${activeTab === 'orders' ? 'text-[#ea2e0e] border-b-2 border-[#ea2e0e]' : 'text-gray-600 hover:text-[#ea2e0e]'}`}
//           onClick={() => setActiveTab('orders')}
//         >
//           My Orders
//         </button>
//         <button
//           className={`px-4 py-2 font-medium ${activeTab === 'settings' ? 'text-[#ea2e0e] border-b-2 border-[#ea2e0e]' : 'text-gray-600 hover:text-[#ea2e0e]'}`}
//           onClick={() => setActiveTab('settings')}
//         >
//           Settings
//         </button>
//       </div>

//       {/* Orders Section */}
//       {activeTab === 'orders' && (
//         <div className="space-y-6">
//           {displayOrders.map(order => (
//             <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
//               <div className="flex justify-between mb-4">
//                 <div>
//                   <h3 className="font-semibold text-lg">Order #{order.id}</h3>
//                   <p className="text-sm text-gray-600">
//                     Placed on {new Date(order.date || Date.now()).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
//                     {order.status}
//                   </span>
//                   <p className="font-bold mt-1">${order.total.toFixed(2)}</p>
//                 </div>
//               </div>

//               {/* Items */}
//               <div className="border-t pt-4">
//                 {order.items.map(item => (
//                   <div key={item.id} className="flex items-center gap-4 mb-3">
//                     <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                     <div className="flex-1">
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
//                     </div>
//                     <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Actions */}
//               <div className="border-t pt-4 mt-4 flex gap-3">
//                 <button onClick={() => toggleExpand(order.id)} className="border px-4 py-2 rounded hover:bg-gray-50 text-sm">
//                   {expanded[order.id] ? 'Hide Details' : 'View Details'}
//                 </button>
//                 {['processing', 'confirmed'].includes(order.status?.toLowerCase()) && (
//                   <button onClick={() => handleCancel(order)} className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">
//                     Cancel Order
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ✅ Settings Section */}
//       {activeTab === 'settings' && (
//         <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-lg">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Account Settings</h2>
//           <div className="space-y-4">
//             <label className="block">
//               <span className="text-sm font-medium text-gray-700">Full Name</span>
//               <input
//                 type="text"
//                 value={settings.name}
//                 onChange={(e) => handleSettingsChange('name', e.target.value)}
//                 className="w-full border rounded p-2 mt-1"
//               />
//             </label>
//             <label className="block">
//               <span className="text-sm font-medium text-gray-700">Email</span>
//               <input
//                 type="email"
//                 value={settings.email}
//                 disabled
//                 className="w-full border rounded p-2 mt-1 bg-gray-100"
//               />
//             </label>
//             <label className="block">
//               <span className="text-sm font-medium text-gray-700">Phone</span>
//               <input
//                 type="text"
//                 value={settings.phone}
//                 onChange={(e) => handleSettingsChange('phone', e.target.value)}
//                 className="w-full border rounded p-2 mt-1"
//               />
//             </label>
//             <label className="block">
//               <span className="text-sm font-medium text-gray-700">Address</span>
//               <textarea
//                 value={settings.address}
//                 onChange={(e) => handleSettingsChange('address', e.target.value)}
//                 className="w-full border rounded p-2 mt-1"
//                 rows={3}
//               />
//             </label>
//             <button
//               onClick={saveSettings}
//               className="bg-[#ea2e0e] text-white px-6 py-2 rounded hover:bg-[#d8290b]"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrdersPage;
import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../utils/api';

const MyOrdersPage = ({ initialTab = 'orders' }) => {
  const { user, orders, setUser } = useApp();

  const [activeTab, setActiveTab] = useState(initialTab); // "orders" | "settings"
  const [expanded, setExpanded] = useState({});
  const [myOrders, setMyOrders] = useState([]);
  const [reviewModal, setReviewModal] = useState({ open: false, order: null, itemKey: '', rating: 5, comment: '' });
  const [settings, setSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    phone: user?.phone || ''
  });

  // sync when parent changes initialTab (so sidebar and internal tabs stay in sync)
  useEffect(() => {
    setActiveTab(initialTab || 'orders');
  }, [initialTab]);

  // Filter user orders
  const userOrders = orders.filter(o => o.userId === user?.id);
  useEffect(() => {
    setMyOrders(userOrders);
  }, [userOrders]);

  // Mock orders for fallback
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 129.98,
      items: [
        { id: 1, name: 'Classic Oxford Button-Down Shirt', size: 'M', color: 'Blue', quantity: 1, price: 34.99, image: 'https://picsum.photos/100/100?random=39' },
        { id: 2, name: 'Slim-Fit Stretch Shirt', size: 'L', color: 'Black', quantity: 2, price: 24.99, image: 'https://picsum.photos/100/100?random=41' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const handleCancel = async (order) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    try {
      await ordersAPI.updateStatus(order.id, 'Cancelled');
      const res = await ordersAPI.getAll();
      setMyOrders(res.data.data || []);
    } catch (e) {
      alert('Failed to cancel order');
    }
  };

  const openReview = (order) => {
    const firstKey = order.items?.[0]?.sku || `name:${order.items?.[0]?.name}`;
    setReviewModal({ open: true, order, itemKey: firstKey, rating: 5, comment: '' });
  };
  const closeReview = () => setReviewModal({ open: false, order: null, itemKey: '', rating: 5, comment: '' });

  const submitReview = () => {
    try {
      const o = reviewModal.order;
      const key = reviewModal.itemKey || 'unknown';
      const storeKey = 'my_reviews';
      const existing = JSON.parse(localStorage.getItem(storeKey) || '{}');
      const entry = { rating: Number(reviewModal.rating), comment: reviewModal.comment, orderId: o?.id, createdAt: new Date().toISOString() };
      existing[key] = existing[key] || [];
      existing[key].push(entry);
      localStorage.setItem(storeKey, JSON.stringify(existing));
      alert('Thanks for your review!');
      closeReview();
    } catch {
      alert('Failed to save review locally.');
    }
  };

  const handleSettingsChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const saveSettings = () => {
    try {
      const updatedUser = { ...user, ...settings };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser && setUser(updatedUser);
      alert('Settings updated successfully!');
    } catch (e) {
      alert('Failed to save settings.');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="text-gray-600 mb-6">You need to be logged in to view this page.</p>
        <Link to="/login" className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">Log In</Link>
      </div>
    );
  }

  const displayOrders = [...myOrders, ...mockOrders];

  return (
    <div>
      {/* Internal tabs (keeps in sync with parent because of initialTab prop and useEffect) */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'orders' ? 'text-[#ea2e0e] border-b-2 border-[#ea2e0e]' : 'text-gray-600 hover:text-[#ea2e0e]'}`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'settings' ? 'text-[#ea2e0e] border-b-2 border-[#ea2e0e]' : 'text-gray-600 hover:text-[#ea2e0e]'}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* Orders Section */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {displayOrders.map(order => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.date || Date.now()).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <p className="font-bold mt-1">${order.total.toFixed(2)}</p>
                </div>
              </div>
            {activeTab === 'placeOrder' && (
  <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
    <h2 className="text-xl font-semibold mb-4">Place a New Order</h2>

    {/* Cart Items */}
    {cart.length === 0 ? (
      <p className="text-gray-600 mb-4">Your cart is empty.</p>
    ) : (
      <div className="space-y-3 mb-4">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-2">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <p className="text-right font-bold mt-2">
          Total: $
          {cart.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2)}
        </p>
      </div>
    )}

    {/* Shipping & Payment */}
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Shipping Address</span>
        <textarea
          value={settings.address}
          onChange={(e) => handleSettingsChange('address', e.target.value)}
          className="w-full border rounded p-2 mt-1"
          rows={3}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Payment Method</span>
        <select
          className="w-full border rounded p-2 mt-1"
          value={settings.paymentMethod || 'Credit Card'}
          onChange={(e) => handleSettingsChange('paymentMethod', e.target.value)}
        >
          <option>Credit Card</option>
          <option>UPI</option>
          <option>Cash on Delivery</option>
        </select>
      </label>

      <button
        onClick={() => {
          if (cart.length === 0) return alert('Your cart is empty!');
          if (!settings.address) return alert('Enter shipping address');

          const newOrder = {
            id: `ORD-${Math.floor(Math.random() * 100000)}`,
            date: new Date().toISOString(),
            status: 'Processing',
            total: cart.reduce((acc, i) => acc + i.price * i.quantity, 0),
            items: cart,
            shippingAddress: settings.address,
            paymentMethod: settings.paymentMethod || 'Credit Card'
          };

          setMyOrders(prev => [newOrder, ...prev]);

          // Clear cart after order
          localStorage.setItem('cart', JSON.stringify([]));
          toast.success('Order placed successfully!');
        }}
        className="bg-[#ea2e0e] text-white px-6 py-2 rounded hover:bg-[#d8290b]"
      >
        Place Order
      </button>
    </div>
  </div>
)}

              {/* Items */}
              <div className="border-t pt-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 mb-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="border-t pt-4 mt-4 flex gap-3">
                <button onClick={() => toggleExpand(order.id)} className="border px-4 py-2 rounded hover:bg-gray-50 text-sm">
                  {expanded[order.id] ? 'Hide Details' : 'View Details'}
                </button>
                {(order.status || '').toLowerCase() === 'delivered' && (
                  <button onClick={() => openReview(order)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    Leave Review
                  </button>
                )}
                {['processing','confirmed'].includes((order.status || '').toLowerCase()) && (
                  <button onClick={() => handleCancel(order)} className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">
                    Cancel Order
                  </button>
                )}
              </div>

              {expanded[order.id] && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-gray-50 rounded">
                    <h5 className="font-medium mb-1">Shipping</h5>
                    <p className="text-gray-700">{order.shippingAddress || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <h5 className="font-medium mb-1">Payment</h5>
                    <p className="text-gray-700">{order.paymentMethod || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <h5 className="font-medium mb-1">Tracking</h5>
                    <p className="text-gray-700">{order.trackingNumber || 'N/A'}</p>
                    <p className="text-gray-700">ETA: {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Settings Section */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Account Settings</h2>
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Full Name</span>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => handleSettingsChange('name', e.target.value)}
                className="w-full border rounded p-2 mt-1"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                type="email"
                value={settings.email}
                disabled
                className="w-full border rounded p-2 mt-1 bg-gray-100"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Phone</span>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => handleSettingsChange('phone', e.target.value)}
                className="w-full border rounded p-2 mt-1"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Address</span>
              <textarea
                value={settings.address}
                onChange={(e) => handleSettingsChange('address', e.target.value)}
                className="w-full border rounded p-2 mt-1"
                rows={3}
              />
            </label>
            <button
              onClick={saveSettings}
              className="bg-[#ea2e0e] text-white px-6 py-2 rounded hover:bg-[#d8290b]"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-4">
            <h3 className="text-xl font-semibold mb-3">Leave a Review</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Product</label>
              <select
                className="w-full border rounded p-2"
                value={reviewModal.itemKey}
                onChange={(e) => setReviewModal((prev) => ({ ...prev, itemKey: e.target.value }))}
              >
                {(reviewModal.order?.items || []).map((it, idx) => {
                  const key = it.sku || `name:${it.name || 'Item ' + (idx + 1)}`;
                  const label = `${it.name || it.sku || 'Item ' + (idx + 1)}${it.sku ? ` (SKU: ${it.sku})` : ''}`;
                  return (
                    <option key={key} value={key}>{label}</option>
                  );
                })}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col text-sm">Rating
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={reviewModal.rating}
                  onChange={(e) => setReviewModal((prev) => ({ ...prev, rating: e.target.value }))}
                  className="border p-2 rounded"
                />
              </label>
              <label className="flex flex-col text-sm col-span-2">Comment
                <textarea
                  rows={4}
                  value={reviewModal.comment}
                  onChange={(e) => setReviewModal((prev) => ({ ...prev, comment: e.target.value }))}
                  className="border p-2 rounded"
                  placeholder="Share your experience..."
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={closeReview} className="px-4 py-2 border rounded">Close</button>
              <button onClick={submitReview} className="px-4 py-2 bg-black text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
