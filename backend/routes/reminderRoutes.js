const express = require('express');
const {
  getReminders,
  getReminder,
  createReminder,
  updateReminder,
  deleteReminder,
  completeReminder
} = require('../controllers/reminderController');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getReminders)
  .post(createReminder);

router.route('/:id')
  .get(getReminder)
  .put(updateReminder)
  .delete(deleteReminder);

router.post('/:id/complete', completeReminder);

module.exports = router;
