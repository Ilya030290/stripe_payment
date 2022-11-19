const express = require('express');

const createCheckoutSession = require('../controller/stripeController');

const router = express.Router();

router.post('/', createCheckoutSession);

module.exports = router;
