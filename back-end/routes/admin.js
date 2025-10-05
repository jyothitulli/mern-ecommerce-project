// // import express from 'express';
// // import { authenticateUser, authorizeAdmin } from '../middleware/auth.js';
// // import { readJSONFile, writeJSONFile, appendToJSONFile, updateJSONFile, deleteFromJSONFile } from '../utils/fileUtils.js';
// // import { v4 as uuidv4 } from 'uuid';

// // const router = express.Router();

// // // Protect all admin routes
// // router.use(authenticateUser, authorizeAdmin);

// // // Health/root for admin
// // router.get('/', (req, res) => {
// //   res.json({ success: true, message: 'Admin API is ready' });
// // });

// // // Admin stats
// // router.get('/stats', (req, res) => {
// //   try {
// //     const users = readJSONFile('users.json');
// //     const products = readJSONFile('products.json');
// //     const orders = readJSONFile('orders.json');

// //     const totalUsers = users.length;
// //     const totalProducts = products.length;
// //     const outOfStock = products.filter(p => (p.countInStock || 0) <= 0).length;
// //     const totalOrders = orders.length;

// //     const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
// //     const byStatus = orders.reduce((acc, o) => {
// //       const s = o.status || 'Processing';
// //       acc[s] = (acc[s] || 0) + 1;
// //       return acc;
// //     }, {});

// //     res.json({
// //       success: true,
// //       data: {
// //         users: { total: totalUsers },
// //         products: { total: totalProducts, outOfStock },
// //         orders: { total: totalOrders, revenue: parseFloat(revenue.toFixed(2)), byStatus }
// //       }
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Error fetching stats', error: error.message });
// //   }
// // });

// // // Users management
// // router.get('/users', (req, res) => {
// //   try {
// //     const users = readJSONFile('users.json');
// //     const sanitized = users.map(({ password, ...u }) => u);
// //     res.json({ success: true, count: sanitized.length, data: sanitized });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
// //   }
// // });

// // router.get('/users/:id', (req, res) => {
// //   try {
// //     const users = readJSONFile('users.json');
// //     const user = users.find(u => u.id === req.params.id);
// //     if (!user) {
// //       return res.status(404).json({ success: false, message: 'User not found' });
// //     }
// //     const { password, ...sanitized } = user;
// //     res.json({ success: true, data: sanitized });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
// //   }
// // });

// // router.put('/users/:id', (req, res) => {
// //   try {
// //     const { name, email, role, address, phone } = req.body;
// //     const users = readJSONFile('users.json');
// //     const index = users.findIndex(u => u.id === req.params.id);
// //     if (index === -1) {
// //       return res.status(404).json({ success: false, message: 'User not found' });
// //     }
// //     if (role && !['admin', 'user'].includes(role)) {
// //       return res.status(400).json({ success: false, message: "Invalid role. Must be 'admin' or 'user'" });
// //     }
// //     users[index] = {
// //       ...users[index],
// //       ...(name !== undefined ? { name } : {}),
// //       ...(email !== undefined ? { email } : {}),
// //       ...(role !== undefined ? { role } : {}),
// //       ...(address !== undefined ? { address } : {}),
// //       ...(phone !== undefined ? { phone } : {}),
// //       updatedAt: new Date().toISOString()
// //     };
// //     const ok = writeJSONFile('users.json', users);
// //     if (!ok) return res.status(500).json({ success: false, message: 'Error updating user' });
// //     const { password, ...sanitized } = users[index];
// //     res.json({ success: true, message: 'User updated', data: sanitized });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
// //   }
// // });

// // router.delete('/users/:id', (req, res) => {
// //   try {
// //     const userId = req.params.id;
// //     if (userId === req.user.id) {
// //       return res.status(400).json({ success: false, message: 'Admins cannot delete themselves' });
// //     }
// //     const users = readJSONFile('users.json');
// //     const exists = users.some(u => u.id === userId);
// //     if (!exists) {
// //       return res.status(404).json({ success: false, message: 'User not found' });
// //     }
// //     const filtered = users.filter(u => u.id !== userId);
// //     const ok = writeJSONFile('users.json', filtered);
// //     if (!ok) return res.status(500).json({ success: false, message: 'Error deleting user' });
// //     res.json({ success: true, message: 'User deleted' });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
// //   }
// // });

// // // Products management
// // router.post('/products', (req, res) => {
// //   try {
// //     const { name, description, price, discountPrice, countInStock, sku, category, brand, sizes, colors, collections, material, gender, images } = req.body;
// //     if (!name || price === undefined || !sku || !category || !brand) {
// //       return res.status(400).json({ success: false, message: 'Missing required fields: name, price, sku, category, brand' });
// //     }
// //     const products = readJSONFile('products.json');
// //     if (products.some(p => p.sku === sku)) {
// //       return res.status(409).json({ success: false, message: 'SKU already exists' });
// //     }
// //     const now = new Date().toISOString();
// //     const newProduct = {
// //       id: `PROD-${Date.now()}-${uuidv4().slice(0,8)}`,
// //       name,
// //       description: description || '',
// //       price: parseFloat(price),
// //       discountPrice: discountPrice !== undefined ? parseFloat(discountPrice) : undefined,
// //       countInStock: countInStock !== undefined ? parseInt(countInStock, 10) : 0,
// //       sku,
// //       category,
// //       brand,
// //       sizes: Array.isArray(sizes) ? sizes : [],
// //       colors: Array.isArray(colors) ? colors : [],
// //       collections: collections || '',
// //       material: material || '',
// //       gender: gender || 'Unisex',
// //       images: Array.isArray(images) ? images : [],
// //       rating: 0,
// //       numReviews: 0,
// //       createdAt: now,
// //       updatedAt: now
// //     };
// //     const ok = appendToJSONFile('products.json', newProduct);
// //     if (!ok) return res.status(500).json({ success: false, message: 'Error creating product' });
// //     res.status(201).json({ success: true, message: 'Product created', data: newProduct });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Error creating product', error: error.message });
// //   }
// // });

// // router.put('/products/:id', (req, res) => {
// //   try {
// //     const products = readJSONFile('products.json');
// //     const index = products.findIndex(p => p.id === req.params.id);
// //     if (index === -1) {
// //       return res.status(404).json({ success: false, message: 'Product not found' });
// //     }
// //     const fields = { ...req.body };
// //     if ('price' in fields) fields.price = parseFloat(fields.price);
// //     if ('discountPrice' in fields) fields.discountPrice = parseFloat(fields.discountPrice);
// //     if ('countInStock' in fields) fields.countInStock = parseInt(fields.countInStock, 10);
// //     products[index] = { ...products[index], ...fields, updatedAt: new Date().toISOString() };
// //     const ok = writeJSONFile('products.json', products);
// //     if (!ok) return res.status(500).json({ success: false, message: 'Error updating product' });
// //     res.json({ success: true, message: 'Product updated', data: products[index] });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Error updating product', error: error.message });
// //   }
// // });

// // router.delete('/products/:id', (req, res) => {
// //   try {
// //     const products = readJSONFile('products.json');
// //     const exists = products.some(p => p.id === req.params.id);
// //     if (!exists) {
// //       return res.status(404).json({ success: false, message: 'Product not found' });
// //     }
// //     const ok = deleteFromJSONFile('products.json', req.params.id);
// //     if (!ok) return res.status(500).json({ success: false, message: 'Error deleting product' });
// //     res.json({ success: true, message: 'Product deleted' });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
// //   }
// // });

// // // Orders management
// // router.get('/orders', (req, res) => {
// //   try {
// //     const orders = readJSONFile('orders.json');
// //     // Optional filter by status
// //     const { status } = req.query;
// //     const filtered = status ? orders.filter(o => (o.status || '').toLowerCase() === status.toLowerCase()) : orders;
// //     res.json({ success: true, count: filtered.length, data: filtered });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Error fetching orders', error: error.message });
// //   }
// // });

// // router.get('/orders/:orderId', (req, res) => {
// //   try {
// //     const orders = readJSONFile('orders.json');
// //     const order = orders.find(o => o.id === req.params.orderId);
// //     if (!order) {
// //       return res.status(404).json({ success: false, message: 'Order not found' });
// //     }
// //     res.json({ success: true, data: order });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Error fetching order', error: error.message });
// //   }
// // });

// // router.patch('/orders/:orderId/status', (req, res) => {
// //   try {
// //     const { status } = req.body;
// //     const validStatuses = ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
// //     if (!status || !validStatuses.includes(status)) {
// //       return res.status(400).json({ success: false, message: 'Invalid status. Valid: ' + validStatuses.join(', ') });
// //     }
// //     const orders = readJSONFile('orders.json');
// //     const index = orders.findIndex(o => o.id === req.params.orderId);
// //     if (index === -1) {
// //       return res.status(404).json({ success: false, message: 'Order not found' });
// //     }
// //     orders[index].status = status;
// //     orders[index].updatedAt = new Date().toISOString();
// //     const ok = writeJSONFile('orders.json', orders);
// //     if (!ok) return res.status(500).json({ success: false, message: 'Error updating order status' });
// //     res.json({ success: true, message: 'Order status updated', data: orders[index] });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Error updating order status', error: error.message });
// //   }
// // });

// // export default router;


import express from 'express';
import { authenticateUser, authorizeAdmin } from '../middleware/auth.js';
import { readJSONFile, writeJSONFile, appendToJSONFile, updateJSONFile, deleteFromJSONFile } from '../utils/fileUtils.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

// Protect all admin routes
router.use(authenticateUser, authorizeAdmin);

// Health/root for admin
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Admin API is ready' });
});

// Admin stats
router.get('/stats', (req, res) => {
  try {
    const users = readJSONFile('users.json');
    const products = readJSONFile('products.json');
    const orders = readJSONFile('orders.json');

    const totalUsers = users.length;
    const totalProducts = products.length;
    const outOfStock = products.filter(p => (p.countInStock || 0) <= 0).length;
    const totalOrders = orders.length;

    const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const byStatus = orders.reduce((acc, o) => {
      const s = o.status || 'Processing';
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        users: { total: totalUsers },
        products: { total: totalProducts, outOfStock },
        orders: { total: totalOrders, revenue: parseFloat(revenue.toFixed(2)), byStatus }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching stats', error: error.message });
  }
});

// Users management
router.get('/users', (req, res) => {
  try {
    const users = readJSONFile('users.json');
    const sanitized = users.map(({ password, ...u }) => u);
    res.json({ success: true, count: sanitized.length, data: sanitized });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
  }
});

router.get('/users/:id', (req, res) => {
  try {
    const users = readJSONFile('users.json');
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { password, ...sanitized } = user;
    res.json({ success: true, data: sanitized });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
  }
});

router.put('/users/:id', (req, res) => {
  try {
    const { name, email, role, address, phone } = req.body;
    const users = readJSONFile('users.json');
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (role && !['admin', 'user'].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role. Must be 'admin' or 'user'" });
    }
    users[index] = {
      ...users[index],
      ...(name !== undefined ? { name } : {}),
      ...(email !== undefined ? { email } : {}),
      ...(role !== undefined ? { role } : {}),
      ...(address !== undefined ? { address } : {}),
      ...(phone !== undefined ? { phone } : {}),
      updatedAt: new Date().toISOString()
    };
    const ok = writeJSONFile('users.json', users);
    if (!ok) return res.status(500).json({ success: false, message: 'Error updating user' });
    const { password, ...sanitized } = users[index];
    res.json({ success: true, message: 'User updated', data: sanitized });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
  }
});

router.delete('/users/:id', (req, res) => {
  try {
    const userId = req.params.id;
    if (userId === req.user.id) {
      return res.status(400).json({ success: false, message: 'Admins cannot delete themselves' });
    }
    const users = readJSONFile('users.json');
    const exists = users.some(u => u.id === userId);
    if (!exists) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const filtered = users.filter(u => u.id !== userId);
    const ok = writeJSONFile('users.json', filtered);
    if (!ok) return res.status(500).json({ success: false, message: 'Error deleting user' });
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
  }
});

// Products management
// List products
router.get('/products', (req, res) => {
  try {
    const products = readJSONFile('products.json');
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error: error.message });
  }
});

router.post('/products', (req, res) => {
  try {
    const { name, description, price, discountPrice, countInStock, sku, category, brand, sizes, colors, collections, material, gender, images } = req.body;
    if (!name || price === undefined || !sku || !category || !brand) {
      return res.status(400).json({ success: false, message: 'Missing required fields: name, price, sku, category, brand' });
    }
    const products = readJSONFile('products.json');
    if (products.some(p => p.sku === sku)) {
      return res.status(409).json({ success: false, message: 'SKU already exists' });
    }
    const now = new Date().toISOString();
    const newProduct = {
      id: `PROD-${Date.now()}-${uuidv4().slice(0,8)}`,
      name,
      description: description || '',
      price: parseFloat(price),
      discountPrice: discountPrice !== undefined ? parseFloat(discountPrice) : undefined,
      countInStock: countInStock !== undefined ? parseInt(countInStock, 10) : 0,
      sku,
      category,
      brand,
      sizes: Array.isArray(sizes) ? sizes : [],
      colors: Array.isArray(colors) ? colors : [],
      collections: collections || '',
      material: material || '',
      gender: gender || 'Unisex',
      images: Array.isArray(images) ? images : [],
      rating: 0,
      numReviews: 0,
      createdAt: now,
      updatedAt: now
    };
    const ok = appendToJSONFile('products.json', newProduct);
    if (!ok) return res.status(500).json({ success: false, message: 'Error creating product' });
    res.status(201).json({ success: true, message: 'Product created', data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating product', error: error.message });
  }
});

router.put('/products/:id', (req, res) => {
  try {
    const products = readJSONFile('products.json');
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const fields = { ...req.body };
    if ('price' in fields) fields.price = parseFloat(fields.price);
    if ('discountPrice' in fields) fields.discountPrice = parseFloat(fields.discountPrice);
    if ('countInStock' in fields) fields.countInStock = parseInt(fields.countInStock, 10);
    products[index] = { ...products[index], ...fields, updatedAt: new Date().toISOString() };
    const ok = writeJSONFile('products.json', products);
    if (!ok) return res.status(500).json({ success: false, message: 'Error updating product' });
    res.json({ success: true, message: 'Product updated', data: products[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating product', error: error.message });
  }
});

router.delete('/products/:id', (req, res) => {
  try {
    const products = readJSONFile('products.json');
    const exists = products.some(p => p.id === req.params.id);
    if (!exists) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const ok = deleteFromJSONFile('products.json', req.params.id);
    if (!ok) return res.status(500).json({ success: false, message: 'Error deleting product' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
  }
});

// Orders management
router.get('/orders', (req, res) => {
  try {
    const orders = readJSONFile('orders.json');
    // Optional filter by status
    const { status } = req.query;
    const filtered = status ? orders.filter(o => (o.status || '').toLowerCase() === status.toLowerCase()) : orders;
    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching orders', error: error.message });
  }
});

router.get('/orders/:orderId', (req, res) => {
  try {
    const orders = readJSONFile('orders.json');
    const order = orders.find(o => o.id === req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching order', error: error.message });
  }
});

router.patch('/orders/:orderId/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status. Valid: ' + validStatuses.join(', ') });
    }
    const orders = readJSONFile('orders.json');
    const index = orders.findIndex(o => o.id === req.params.orderId);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();
    const ok = writeJSONFile('orders.json', orders);
    if (!ok) return res.status(500).json({ success: false, message: 'Error updating order status' });
    res.json({ success: true, message: 'Order status updated', data: orders[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating order status', error: error.message });
  }
});

// Helper to slugify product names similarly to filenames
const slugify = (name = '') => name
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

// Sync images for products: assign up to 3 images matching name/id
router.post('/products/images/sync', (req, res) => {
  try {
    // Determine repo-level images/products directory (matches server.js static mapping)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const repoImagesDir = path.resolve(__dirname, '../../images/products');

    if (!fs.existsSync(repoImagesDir)) {
      return res.status(404).json({ success: false, message: `Images directory not found: ${repoImagesDir}` });
    }

    // Build an index of available images by slug
    const allFiles = fs.readdirSync(repoImagesDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    const imagesBySlug = allFiles.reduce((acc, file) => {
      const base = path.basename(file, path.extname(file)); // e.g., 'watch-9'
      const slug = base.replace(/-\d+$/, ''); // remove trailing -number
      if (!acc[slug]) acc[slug] = [];
      acc[slug].push(file);
      return acc;
    }, {});

    const products = readJSONFile('products.json');
    let updated = 0;

    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      const currImages = Array.isArray(p.images) ? p.images : [];
      const hasAtLeastOne = currImages.length > 0 && currImages[0] && currImages[0].url;
      const nameSlug = slugify(p.name || '');

      // Try to match by name slug first
      let candidates = imagesBySlug[nameSlug] || [];

      // If no candidates and id looks like PROD-###, try a generic match by trailing number
      if (candidates.length === 0 && /^PROD-\d+/.test(p.id || '')) {
        const num = parseInt((p.id || '').replace(/[^0-9]/g, ''), 10);
        candidates = allFiles.filter(f => new RegExp(`-${num}(?=\\.|$)`).test(f));
      }

      if (candidates.length === 0) {
        // No images found for this product; skip unless overwrite requested
        continue;
      }

      // Create image objects (cap at 3 to avoid huge payloads)
      const selected = candidates.slice(0, 3);
      const imageObjs = selected.map(file => ({
        url: `/images/products/${file}`,
        altText: `${p.name} Image`
      }));

      const overwrite = (req.query.overwrite === 'true') || (req.body && req.body.overwrite === true);
      if (!hasAtLeastOne || overwrite) {
        p.images = imageObjs;
        p.updatedAt = new Date().toISOString();
        updated++;
      }
    }

    const ok = writeJSONFile('products.json', products);
    if (!ok) return res.status(500).json({ success: false, message: 'Failed to write products.json' });

    res.json({ success: true, message: 'Images sync complete', updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error syncing product images', error: error.message });
  }
});

export default router;
