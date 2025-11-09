const express = require('express');
const {
  getUsers,
  getUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin'), getUsers);
router.get('/:id', protect, getUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
