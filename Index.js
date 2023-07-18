const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

// imported image route in index file
const uploadImageRoute = require("./src/Router/UploadImage.route")

const app = express()
const port = process.env.PORT || 3000

// using the route in (app.use)
app.use("/upload", uploadImageRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
