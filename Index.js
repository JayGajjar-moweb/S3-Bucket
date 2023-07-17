const express = require("express")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// imported image route in index file
const UploadImageRoute = require("./src/Router/UploadImage.route")

// using the route in (app.use)
app.use("/upload", UploadImageRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
