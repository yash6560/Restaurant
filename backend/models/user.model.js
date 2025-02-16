const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    image: {
        type:String,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    resetpasswordToken : {
        type: String,
    },
    resetpasswordExpiredAT : {
        type: Date,
    },
    verifyToken : {
        type: String,
    },
    verifyTokenExpiredAT : {
        type: Date,
    },
    isVerify : {
        type: Boolean,
        default: false,
    },
    address:{
        type:String,
        default:"Enter your address",
    },
    city:{
        type:String,
        default:"Enter your city",
    },
    country:{
        type:String,
        default:"Enter your country",
    },
    pincode: {
        type: Number,
        default:123456
    },
    contact : {
        type : Number,
        default : 8888888888
    }
},
{
    timestamps: true,
})

const USER = mongoose.model('user',userSchema);

module.exports = USER;