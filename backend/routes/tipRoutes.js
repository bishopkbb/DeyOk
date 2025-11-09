const express = require('express');
const {
  getTips,
  getDailyTip,
  getTip,
  createTip,
  likeTip
} = require('../controllers/tipController');

const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getTips);
router.get('/daily', getDailyTip);
router.get('/:id', getTip);

// Protected routes
router.post('/', protect, authorize('admin'), createTip);
router.post('/:id/like', protect, likeTip);

module.exports = router;
