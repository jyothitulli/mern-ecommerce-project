import express from 'express';
import { authenticateUser } from '../middleware/auth.js';
import { readJSONFile, appendToJSONFile, writeJSONFile } from '../utils/fileUtils.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create a new review
router.post('/', authenticateUser, (req, res) => {
  try {
    const { productKey, rating, comment, orderId } = req.body;

    if (!productKey) {
      return res.status(400).json({ success: false, message: 'productKey is required (e.g., SKU or unique name key)' });
    }

    const numRating = parseInt(rating, 10);
    if (Number.isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({ success: false, message: 'rating must be an integer between 1 and 5' });
    }

    const reviews = readJSONFile('reviews.json');
    const duplicate = reviews.find(r => r.userId === req.user.id && r.productKey === productKey && (orderId ? r.orderId === orderId : true));
    if (duplicate) {
      return res.status(409).json({ success: false, message: 'You have already reviewed this item.' });
    }

    const now = new Date().toISOString();
    const newReview = {
      id: uuidv4(),
      userId: req.user.id,
      productKey,
      rating: numRating,
      comment: comment || '',
      orderId: orderId || null,
      createdAt: now,
      updatedAt: now
    };

    const ok = appendToJSONFile('reviews.json', newReview);
    if (!ok) {
      return res.status(500).json({ success: false, message: 'Error saving review' });
    }

    res.status(201).json({ success: true, message: 'Review submitted', data: newReview });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating review', error: error.message });
  }
});

// List reviews for a product
router.get('/product/:productKey', (req, res) => {
  try {
    const productKey = req.params.productKey;
    const reviews = readJSONFile('reviews.json').filter(r => r.productKey === productKey);
    const count = reviews.length;
    const avg = count > 0 ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / count) : 0;
    res.json({ success: true, count, averageRating: Number(avg.toFixed(2)), data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching reviews', error: error.message });
  }
});

// List the current user's reviews
router.get('/me', authenticateUser, (req, res) => {
  try {
    const reviews = readJSONFile('reviews.json').filter(r => r.userId === req.user.id);
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching your reviews', error: error.message });
  }
});

export default router;
