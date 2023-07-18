const path = require("path")
const multer = require("multer")
const multerS3 = require("multer-s3")
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
});

const s3Storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    metadata: (req, file, cb) => {
        cb(null, {
            url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`,
        });
    },
    key: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = Date.now() + fileExt;
        cb(null, fileName);
    },
});

// This function is used sanitize files and sending errors for unsupported files 
const sanitizeFile = (file, cb) => {
    // File extentions to be allowed
    const fileExts = [".png", ".jpg", ".jpeg"];

    // check for allowed extentions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type checks that uploading file must be image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // Return error message
        cb("File type not allowed!");
    }
} 

// This code checks validation and upload image
const uploadImage = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, (err) => {
            if (err) {
                req.fileValidationError = err;
                return callback(null, false);
            }
            callback(null, true);
        });
    },
});

module.exports =  uploadImage 
