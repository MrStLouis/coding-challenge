const express = require('express');

const homeData = require('../controllers/homeData');

const router = express.Router();

// home route
router.route('/')
  .post(homeData);

module.exports = router;
