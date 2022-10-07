const user = require("../models/userModel")
const follow = require("../models/followModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("colors")

exports.registerUser = async (req, res) => {
    try {
        // console.log(req.body);
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
        const result = await user.create(req.body)
        // console.log(result);
        if (!result) {
            res.status(400).json({
                success: false,
                message: "error",
            })
        }
        res.json({
            success: true,
            message: "user register successfully",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error ${error}`
        })
    }
}

exports.getSingleUser = async (req, res) => {
    try {
        const { id } = req.params
        // let info
        // console.log(id);
        let result = await user.findOne({ _id: id }, { __v: 0, updatedAt: 0, createdAt: 0, password: 0 })
        // if (result) {
        const clientId = id
        let info = await follow.findOne({ clientId })
        // }
        // const combined = Object.assign(result, { zzzz: "zzZZ" })
        const combined = { ...result, ...info }
        console.log(combined);

        res.json({
            success: true,
            message: "got single user",
            combined
        })
    } catch (error) {
        res.json({
            success: false,
            message: "error " + error,
        })
    }
}
exports.getAllSuggestedUsers = async (req, res) => {
    try {
        const token = req.headers.authorization
        // console.log(token);
        const { id } = jwt.verify(token, process.env.JWT_KEY)
        const result = await user.find({ _id: { $ne: id }, active: true }).select('username fullName _id profile')
        res.json({
            success: true,
            message: "got all registered users",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "errorr " + error,
        })
    }
}
exports.updateUser = async (req, res) => {
    try {
        // console.log(req.body);
        const { id } = req.params
        if (!id) {
            return res.json({
                success: true,
                message: "update Fail ,Please try again later..",
            })
        }
        // console.log(id);
        const result = await user.findByIdAndUpdate(id, req.body, { new: true })
        // console.log(result);
        res.json({
            success: true,
            message: "user updated successful",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "error " + error,
        })
    }
}
exports.deactivateAccount = async (req, res) => {
    try {
        // console.log(req.body);
        const { id } = req.params
        if (!id) {
            return res.json({
                success: true,
                message: "Request Fail ,Please try again later..",
            })
        }
        const findUser = await user.findById(id)
        if (!findUser) {
            return res.status(400).json({
                success: false,
                message: "Account Does not find"
            })
        }
        const checkPassword = await bcrypt.compare(req.body.password, findUser.password)
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Your information is wrong ,Please Check it again.."
            })
        }
        const result = await user.findByIdAndUpdate(id, { $set: { "active": false } }, { new: true })
        // console.log(result);
        res.json({
            success: true,
            message: "Account Deactivated",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "error " + error,
        })
    }
}
exports.deleteAllUsers = async (req, res) => {
    try {
        const result = await user.deleteMany()
        res.json({
            success: true,
            message: "user deleted successful",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "error " + error,
        })
    }
}