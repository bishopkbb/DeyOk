const express = require('express');
const router = express.Router();
const {
  getTips,
  getDailyTip,
  getTip,
  createTip,
  updateTip,
  deleteTip
} = require('../controllers/tipController');

const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getTips);
router.get('/daily', getDailyTip);
router.get('/:id', getTip);

// Protected/Admin routes
router.post('/', protect, authorize('admin'), createTip);
router.put('/:id', protect, authorize('admin'), updateTip);
router.delete('/:id', protect, authorize('admin'), deleteTip);

module.exports = router;