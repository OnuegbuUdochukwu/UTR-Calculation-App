const express = require('express');
const { getMatchHistory } = require('../controllers/playerController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/me/match-history', protect, getMatchHistory);

module.exports = router;
