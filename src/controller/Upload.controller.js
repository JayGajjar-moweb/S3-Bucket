const multer = require("multer")
const { s3Storage } = require("../helper/Upload.hepler")
const { sanitizeFile } = require("../middleware/UploadImage.middeware")

// Image middleware for storage and validation
const uploadImageMiddleware = multer({
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

const uploadImageController = [
    uploadImageMiddleware.single("image"),
    async (req, res, next) => {
        if (req.fileValidationError) {
            // File validation error occurred
            res.status(400).send({
                error: true,
                message: req.fileValidationError,
            });
        } else if (req.file) {
            // Image uploaded successfully
            const image_URL = req.file.location;
            res.send({
                error: false,
                message: "This image was uploaded successfully...",
                data: { image_URL },
            });
        } else {
            // No image file uploaded
            res.status(400).send({ error: "No image file uploaded" });
        }
    },
];

module.exports = { uploadImageController };
