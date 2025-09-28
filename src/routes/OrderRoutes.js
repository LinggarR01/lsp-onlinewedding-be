const express = require('express');
const router = express.Router();
const OrderController = require('../controller/OrderController');

router.get('/orders', OrderController.getAll);
router.get('/orders/:id', OrderController.getById);
router.post('/orders', OrderController.create);
router.put('/orders/:id', OrderController.update);
router.delete('/orders/:id', OrderController.delete);

module.exports = router;
