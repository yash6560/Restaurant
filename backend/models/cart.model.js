const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        require: true,
    },
    items:[{
        foodId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'food_list',
            require : true,
        },
        name: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
          },
    }]
})

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;