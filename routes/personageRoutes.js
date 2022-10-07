const express = require("express")
const { handlePostLiked, addComment } = require("../controllers/personageController")
const { protected } = require("../middlewares/protected")
const router = express.Router()

router.put("/like", protected, handlePostLiked)
router.put("/comment", protected, addComment)

module.exports = router 