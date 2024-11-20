const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.route('/add-order').post(orderController.postOrder);
router.route('/get-order/:userId').get(orderController.getMyOrders)
module.exports = router;
