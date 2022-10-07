const multer = require("multer")
const path = require("path")
const fs = require("fs")

// if (fs.existsSync("../public/profiles/")) {

// }

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/profiles"),
    filename: (req, file, cb) => {
        console.log(req.body);
        const ext = path.extname(file.originalname)
        const fn = Date.now() + ext
        req.body.profile = `profiles/${fn}`
        cb(null, fn)
    }
})

exports.upload = multer({ storage })