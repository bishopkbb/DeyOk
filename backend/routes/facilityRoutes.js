const express = require('express');
const {
  getFacilities,
  getNearbyFacilities,
  getFacility,
  addReview
} = require('../controllers/facilityController');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/', getFacilities);
router.get('/nearby', getNearbyFacilities);
router.get('/:id', getFacility);

// Protected routes
router.post('/:id/review', protect, addReview);

module.exports = router;
