const express = require('express');
const { placeOrder } = require('../controllers/placedOrderController');
const { getOrders } = require('../controllers/orderController');

const router = express.Router();


router.post('/place-order', placeOrder);

module.exports = router;
