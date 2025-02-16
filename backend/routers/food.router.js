const express = require('express')
const {foodDisplay, addFood, removeFood, editMenu} = require('../controllers/food.controler')
const authorizedCheck = require('../middleware/authorizedCheck');
const upload = require('../middleware/multer');

const router = express.Router();

router.get('/food-list', foodDisplay)
router.post('/add-food',authorizedCheck, upload.single('image'), addFood)
router.post('/remove-food',authorizedCheck, upload.single('image'), removeFood)
router.put('/edit-menu/:id',authorizedCheck, upload.single('image'), editMenu)

module.exports = router;