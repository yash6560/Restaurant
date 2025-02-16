const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('../utils/cloudinary');

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : "Food_Images",
        format : async(req, file) => "png", //convert to png
        public_id : (req, file) => file.originalname.split('.')[0]
    }
})

// Multer Middleware
const upload = multer({storage});

module.exports = upload;