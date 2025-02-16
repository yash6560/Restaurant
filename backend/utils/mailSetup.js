const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Port 465 ki jagah 587 use karein
    secure: false, // SSL ke bina authentication
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Self-signed certificates ke errors avoid karne ke liye
    }
});

const sendResetCodeEmail = async (email, verifyToken) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Code",
        text: `Your password reset code is: ${verifyToken}. This code will expire in 15 minutes.`
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendResetCodeEmail;