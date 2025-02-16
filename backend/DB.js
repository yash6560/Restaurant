const mongoose = require('mongoose');

const DBConnect = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("data base connect");
    });
}

module.exports = DBConnect;