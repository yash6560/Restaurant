const express = require('express')
const authorizedCheck = require('../middleware/authorizedCheck');
const {placeOrder, verifyOrder, getOrder} = require('../controllers/order.controler');

const router = express.Router();

router.post('/place',authorizedCheck, placeOrder )
router.post('/all',authorizedCheck, getOrder )
router.post('/webhook', verifyOrder); // No need for express.raw() here

module.exports = router;