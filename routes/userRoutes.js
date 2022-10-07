const express = require("express")
const { registerUser, deleteAllUsers, getAllSuggestedUsers, getSingleUser, updateUser, deactivateAccount } = require("../controllers/userController")
const { protected } = require("../middlewares/protected")
const { upload } = require("../middlewares/profileMiddleware")

const router = express.Router()

router.post("/register", upload.single("profile"), registerUser)

router.get("/profile/:id", protected, getSingleUser)

router.get("/allUsers", protected, getAllSuggestedUsers)

router.put("/edit/:id", upload.single("profile"), updateUser)

router.put("/deactivate/:id", deactivateAccount)

router.delete("/destroy", deleteAllUsers)
module.exports = router