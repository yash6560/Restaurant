const express = require('express');
const { userLogin, userSignup, userForgotPassword, userVerify, userResetPasword, checkAuth, userLogout,userUpdateProfile } = require('../controllers/user.controler');
const authorizedCheck = require('../middleware/authorizedCheck');
const router = express.Router();
const upload = require('../middleware/multer');

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.post('/forgot-password', userForgotPassword);
router.post('/verify', userVerify);
router.post('/reset-password', userResetPasword);
router.get('/check-auth', authorizedCheck, checkAuth);
router.post('/logout', authorizedCheck, userLogout);
router.post('/update-profile', authorizedCheck,upload.single('image'), userUpdateProfile);

module.exports = router;