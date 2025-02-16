const jwt = require('jsonwebtoken');
const USER = require('../models/user.model');


const authorizedCheck = async (req, res, next) => {
    try {
        const {token} = req.cookies;

        if(!token){
            return res.status(401).json({success: false, message:"Token is expire login again"}); 
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await USER.findById(decode.userId).select("-password");

        if(!user) { 
            return res.status(401).json({message : "user is not found", success: false});
        }
        
        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:"Invalid Authentication"}); 
    }
}

module.exports = authorizedCheck;