const express = require("express")
const { uploadImageController } = require("../controller/Upload.controller")

const router = express.Router()

router.post("/images", uploadImageController);

module.exports = router