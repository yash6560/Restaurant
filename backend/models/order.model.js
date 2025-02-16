const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    deliveryDetails: {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        pincode: {
            type: Number,
            default:123456
        }        
    },
    items : {
            type : Array,
            required : true,
        },
    totalAmount:{
        type:Number,
        required:true,
    },
    status :{
        type:String,
        enum: ["Pending", "Confirmed", "Preparing", "OutForDelivery", "Delivered", "Cancelled"],
        default:"Pending",
    },
    payment: {
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },
        paymentMethod: {
            type: String,
            enum: ["Card", "UPI", "CashOnDelivery"],
            default: "Card"
        },
        transactionId: {
            type: String, // Stores Stripe Payment ID
            default: null
        }
    },
    date : {
        type: Date,
        default: Date.now,
    }
})

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;