const express = require("express")
const uploadController = require("../controller/Upload.controller")

const router = express.Router()

router.post("/images", uploadController.uploadImage);

module.exports = router