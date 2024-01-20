const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
router.post('/createorder', orderController.createOrder);
router.get('/vieworder', orderController.getAllOrders);
router.delete("/delete/:id", orderController.cancelOrder);
module.exports = router;