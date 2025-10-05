// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import session from 'express-session';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Import routes
// import authRoutes from './routes/auth.js';
// import productRoutes from './routes/products.js';
// import orderRoutes from './routes/orders.js';
// import userRoutes from './routes/users.js';

// // ES Module dirname fix
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://localhost:80', 'http://localhost', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//   optionsSuccessStatus: 200
// }));

// // Session configuration
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your-session-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // Set to true in production with HTTPS
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files (images)
// app.use('/images', express.static(path.join(__dirname, 'public/images')));

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/users', userRoutes);

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ message: 'E-commerce API is running!', timestamp: new Date().toISOString() });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
// });
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';

// Utils for seeding
import { readJSONFile, appendToJSONFile } from './utils/fileUtils.js';
import { v4 as uuidv4 } from 'uuid';

// ES Module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://localhost:80', 'http://localhost', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (images)
app.use('/images', express.static(path.join(__dirname, 'public/images')));
// Also serve repository-level product images for development/demo use
app.use('/images/products', express.static(path.join(__dirname, '../../images/products')));

// Seed a default admin if none exists
const ensureDefaultAdmin = async () => {
  try {
    const users = readJSONFile('users.json');
    const hasAdmin = users.some(u => (u.role || 'user') === 'admin');
    if (!hasAdmin) {
      const name = process.env.ADMIN_NAME || 'Admin';
      const email = process.env.ADMIN_EMAIL || 'admin@local.com';
      const passwordPlain = process.env.ADMIN_PASSWORD || 'admin123';
      const password = await bcrypt.hash(passwordPlain, 10);
      const adminUser = {
        id: uuidv4(),
        name,
        email,
        password,
        role: 'admin',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        address: '',
        phone: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      appendToJSONFile('users.json', adminUser);
      console.log('✅ Seeded default admin user:', email);
    }
  } catch (e) {
    console.error('Failed to ensure default admin:', e.message);
  }
};
await ensureDefaultAdmin();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'E-commerce API is running!', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
});