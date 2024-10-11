const express = require('express');
const { getOrders } = require('../controllers/orderController');

const router = express.Router();


router.post('/orders', getOrders);

module.exports = router;
