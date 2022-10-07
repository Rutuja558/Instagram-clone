const post = require("../models/postModel")
const user = require("../models/userModel")
const jwt = require("jsonwebtoken")

exports.addNewPost = async (req, res) => {
    try {
        const token = req.headers.authorization
        const { id } = jwt.verify(token, process.env.JWT_KEY)
        req.body.userId = id
        const result = await post.create(req.body)
        // console.log(result);
        res.json({
            success: true,
            message: "Post Added Successfully",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error ${error}`
        })
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const { id } = req.params
        const allPosts = await post
            .find({
                userId: id
            },
                { __v: 0, createdAt: 0, updatedAt: 0 }).populate('comments.reviewer')
            .populate('userId', { _id: 1, username: 1, fullName: 1, profile: 1 })
        res.json({
            success: true,
            message: "Get All Posts",
            allPosts
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error ${error}`,
        })
    }
}

exports.deleteAllPosts = async (req, res) => {
    await post.deleteMany()
    res.json({
        success: true,
        message: "Deleted All Post"
    })
}