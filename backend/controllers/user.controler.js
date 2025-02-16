const USER = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const generateRandomCode = require('../utils/resetTokenGenrate');
const sendResetCodeEmail = require('../utils/mailSetup');

const userSignup = async (req, res) => {
    const {name, email, password} = req.body;

    try {
           
    if(!name || !email || !password){
        return res.status(401).json({message:"All field are required", success: false});
    }

    if(password.length < 6 ){
        return res.status(401).json({message:"password atlest 6 charector long", success: false});
    }

    const userExist = await USER.findOne({email});

    if(userExist){
        return res.status(401).json({message:"user already exist with this email id", success: false});
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await USER.create({
        name, email, password: hashPassword
    })
    return res.status(200).json({message : "user is register", success:true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "user not registered", success : false});
    }
}

const userLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        if(!email || !password){
            return res.status(401).json({message:"All field are required", success: false});
        }
    
        if(password.length < 6 ){
            return res.status(401).json({message:"password atlest 6 charector long", success: false});
        }

        const user = await USER.findOne({email});

        if(!user){
            return res.status(401).json({message:"Invalid credentials", success: false});
        }

        const passCheck = await bcrypt.compare(password, user.password);

        if(!passCheck) {
            return res.status(401).json({message:"Invalid credentials", success: false});
        }

        const token = await generateToken(user._id, res);

        return res.status(200).json({message: "user is login", success:true, token })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "user not Login", success : false});
    }
}

const userForgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await USER.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid Email", success: false});
        }

        const verifyToken = await generateRandomCode();

        user.resetpasswordToken = verifyToken;
        user.resetpasswordExpiredAT = Date.now() + 15 * 60 * 1000;

        await user.save();
        // sendEmail

        await sendResetCodeEmail(user.email, verifyToken);
        
        return res.status(200).json({message: "Verification code is send on you email", success : true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Email is not sent", success : false});
    }
}

const userVerify = async (req, res) => {
    const {otp, email} = req.body;
    try {
        const userExist = await USER.findOne({email})

        if(userExist.resetpasswordExpiredAT < Date.now()){
            return res.status(401).json({message:"OTP is expired", success: false});
        }

        if(userExist.resetpasswordToken !== otp){
            return res.status(404).json({message:"provide otp is invalid", success: false});
        }

        userExist.resetpasswordToken=''
        userExist.resetpasswordExpiredAT=''
        await userExist.save();
          
        return res.status(200).json({message: "otp is verify", success: true, email});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Email is not sent", success : false});
    }
}

const userResetPasword = async (req, res) => {
    const {newpassword, email} = req.body;
    try {
        const userExist = await USER.findOne({email});
        if(!userExist){
            return res.status(401).json({message:"user is not present", success: false});
        }
        const hashPassword = await bcrypt.hash(newpassword, 10);
        userExist.password = hashPassword;
        await userExist.save();

        return res.status(200).json({message: "Password is updated", success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Email is not sent", success : false});
    }
}

const checkAuth = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Login again", success : false});
    }

}

const userLogout = async(req, res) => {
    try {
        return res.clearCookie('token').status(200).json({success:true, message:"logout successful"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Not Logout", success : false});
    }
}

const userUpdateProfile = async(req, res) => {
    const userId = req.user._id;
    let image = req.file.path;
    try {
        await USER.findByIdAndUpdate(userId, {
                address : req.body.address,
                city : req.body.city,
                country : req.body.country,
                pincode : req.body.pincode,
                contact : req.body.contact,
                image : image,
        })

        return res.status(200).json({message: "data updated", success:true});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Update Failes", success : false});
    }
}

module.exports = {userSignup, userLogin, userForgotPassword, userVerify, userResetPasword, checkAuth, userLogout, userUpdateProfile};