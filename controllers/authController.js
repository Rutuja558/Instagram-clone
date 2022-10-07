const user = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const e = require("express")
exports.loginUser = async (req, res) => {
    try {
        // console.log(req.body);
        const valid = await user.findOne({ username: req.body.username })
        if (!valid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        if (!valid.active) {
            return res.status(400).json({
                success: false,
                message: "Account is deactivated"
            })
        }
        const validPassword = await bcrypt.compare(req.body.password, valid.password)
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const token = jwt.sign({ id: valid._id }, process.env.JWT_KEY)
        res.json({
            success: true,
            message: "login Successful",
            result: {
                id: valid._id,
                username: valid.username,
                // email: valid.email,
                profile: valid.profile,
                following: valid.following,
                token
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: `Error ${error}`
        })
    }
}

exports.verifyUsername = async (req, res) => {
    try {
        // console.log(req.body.username);
        const verifyUsername = await user.findOne({ username: req.body.username })
        // console.log(verifyUsername);
        if (!verifyUsername) {
            return res.status(400).json({
                success: false,
                message: "Invalid Username"
            })
        }
        res.json({
            success: true,
            message: "Email matched",
            result: {
                username: verifyUsername.username,
                id: verifyUsername._id
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error" + error
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const id = req.headers.authorization
        if (!id) {
            return res.status(401).json({
                success: false,
                message: "There was an error understanding the request"
            })
        }
        const salt = await bcrypt.genSalt()
        newPassword = await bcrypt.hash(req.body.password, salt)
        if (!newPassword) {
            return res.status(401).json({
                success: false,
                message: "Error occured ,Please try again later.."
            })
        }
        await user.findByIdAndUpdate(id, { password: newPassword }, { new: true })
        res.json({
            success: true,
            message: "Reset Password Succesfully"
        })
    } catch (error) {
        return res.staus(400).json({
            success: false,
            message: "Error" + error
        })
    }
}