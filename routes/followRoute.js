const express = require("express")
const { handleFollow, getAllFollowersPost, getAllFollowers } = require("../controllers/followController")
const { protected } = require("../middlewares/protected")
const router = express.Router()

router.put("/follow", protected, handleFollow)
router.get("/allFollowers/:id", protected, getAllFollowers)
router.get("/followers-post", protected, getAllFollowersPost)

module.exports = router