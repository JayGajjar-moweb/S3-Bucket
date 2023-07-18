const uploadHelper = require("../helper/Upload.hepler");

const uploadImage = async (req, res, next) => {
    uploadHelper.single("image")(req, res, (err) => {
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
            res.status(400).send({ error: "No image uploaded" });
        }
    });
};

module.exports = {
    uploadImage
}