const express = require("express")
const { loginUser, verifyUsername, resetPassword } = require("../controllers/authController")
const router = express.Router()

router.post("/", loginUser)
router.post("/verify_username", verifyUsername)
router.put("/resetPassword", resetPassword)
module.exports = router