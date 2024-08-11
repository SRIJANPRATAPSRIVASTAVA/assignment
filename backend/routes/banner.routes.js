const express = require('express');
const router = express.Router();
const { getBanner, updateBanner } = require('../controllers/banner.controller');

// Route to get banner details
router.get('/banner', getBanner);

// Route to update banner details
router.post('/banner', updateBanner);

module.exports = router;
