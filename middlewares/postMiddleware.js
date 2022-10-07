const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/posts"),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const fn = Date.now() + ext
        cb(null, fn)
        req.body.image = `posts/${fn}`
    }
})

exports.post = multer({ storage })