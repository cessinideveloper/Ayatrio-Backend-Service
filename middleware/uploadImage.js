const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const path = require("path");

const s3 = new S3Client({  // create s3 instance using S3Client 
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
})

const s3Storage = multerS3({
    s3: s3, // s3 instance
    bucket: "ayatrio-images", 
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, {fieldname: file.fieldname})
    },
    key: (req, file, cb) => {
        const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
        cb(null, fileName);
    }
});


// function to sanitize files and send error for unsupported files
function sanitizeFile(file, cb) {

    const fileExts = [".png", ".jpg", ".jpeg", ".gif"]; // allowed extension

    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt) {
        if (isAllowedMimeType) {
            return cb(null, true); // no errors
        } else {
            cb("Error: Invalid MIME type! Only image files are allowed.");
        }
    } else {
        cb("Error: Invalid file extension! Only .png, .jpg, .jpeg, and .gif are allowed.");
    }
}


// middleware
const uploadImage = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback)
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2mb file size
    }
})

module.exports = uploadImage;