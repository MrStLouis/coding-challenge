const express = require('express');

const homeData = require('../controllers/homeData');

const router = express.Router();

// home route
router.route('/')
  .get(homeData);

module.exports = router;
