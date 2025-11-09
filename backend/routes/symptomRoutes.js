const express = require('express');
const {
  getSymptoms,
  checkSymptoms,
  getSymptomHistory
} = require('../controllers/symptomController');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/', getSymptoms);
router.post('/check', protect, checkSymptoms);
router.get('/history', protect, getSymptomHistory);

module.exports = router;
