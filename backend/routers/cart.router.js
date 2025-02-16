const express = require('express')
const {AddItems, fetchData, IncreaseCartItem, DecreseCartItem, removeFromCart, deleteCart} = require('../controllers/cart.controler')
const authorizedCheck = require('../middleware/authorizedCheck');

const router = express.Router();

router.post('/add',authorizedCheck, AddItems);
router.get('/data',authorizedCheck, fetchData);
router.put('/add/:id',authorizedCheck, IncreaseCartItem);
router.put('/minus/:id',authorizedCheck, DecreseCartItem);
router.put('/remove/:id',authorizedCheck, removeFromCart);
router.delete('/delete',authorizedCheck, deleteCart);

module.exports = router;