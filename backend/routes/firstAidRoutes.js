const express = require('express');
const {
  getFirstAidTopics,
  getFirstAidByType,
  createFirstAidContent
} = require('../controllers/firstAidController');

const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getFirstAidTopics);
router.get('/:type', getFirstAidByType);
router.post('/', protect, authorize('admin'), createFirstAidContent);

module.exports = router;
