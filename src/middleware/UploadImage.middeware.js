const path = require("path")

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
        cb({Error: "File type not allowed!"});
    }
} 

module.exports = { sanitizeFile };
