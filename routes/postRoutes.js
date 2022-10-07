const express = require("express")
const { protected } = require("../middlewares/protected")
const { addNewPost, getAllPosts, deleteAllPosts } = require("../controllers/postController")
const { post } = require("../middlewares/postMiddleware")
const router = express.Router()

router.post("/:id", protected, post.single("image"), addNewPost)
router.get("/:id", protected, getAllPosts)
router.delete("/destroy", deleteAllPosts)

module.exports = router 