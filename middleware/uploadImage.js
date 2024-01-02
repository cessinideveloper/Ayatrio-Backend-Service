const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const path = require("path");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: "ap-south-1",
});

const imageStorage = multerS3({
  s3: s3,
  bucket: "ayatrio-images",
  acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
    cb(null, fileName);
  },
});

const pdfStorage = multerS3({
  s3: s3,
  bucket: "ayatrio-images",
  acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
    cb(null, fileName);
  },
});

function sanitizeFile(file, cb) {
  const imageExts = [".png", ".jpg", ".jpeg", ".gif"];
  const pdfExts = [".pdf"]; // Allowed PDF extension

  const allowedExts = file.mimetype.startsWith("image/") ? imageExts : pdfExts;

  const isAllowedExt = allowedExts.includes(path.extname(file.originalname.toLowerCase()));

  if (isAllowedExt) {
    return cb(null, true); // no error
  } else {
    cb("Error: Invalid file type! Only images (.png, .jpg, .jpeg, .gif) or PDFs are allowed.");
  }
}

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB file size for images
  },
});

const uploadPDF = multer({
  storage: pdfStorage,
  fileFilter: (req, file, callback) => {
    console.log("uploading pdf");
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB file size for PDFs
  },
});

module.exports = { uploadImage, uploadPDF };
