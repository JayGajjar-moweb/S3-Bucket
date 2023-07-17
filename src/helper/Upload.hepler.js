const path = require("path")
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

module.exports = { s3Storage };
