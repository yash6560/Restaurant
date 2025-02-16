const JWT = require('jsonwebtoken');

const generateToken = async (userId, res) => {
        const token = await JWT.sign({userId}, process.env.JWT_SECRET, {expiresIn:'7d'});
        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            sameSite: "strict",
        });
        return token;

}

module.exports = generateToken;