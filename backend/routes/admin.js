const express = require('express');
const { getAllUsers, addMatch } = require('../controllers/adminController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.get('/all-users', protect, restrictTo('admin'), getAllUsers);
router.post('/upload-score', protect, restrictTo('admin'), addMatch);

module.exports = router;
