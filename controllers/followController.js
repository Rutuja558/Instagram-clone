const follow = require("../models/followModel")
const user = require("../models/userModel")
const post = require("../models/postModel")
const jwt = require("jsonwebtoken")

exports.handleFollow = async (req, res) => {
    try {
        const token = req.headers.authorization
        const { id } = jwt.verify(token, process.env.JWT_KEY)
        const clientId = id
        const userID = req.body.usersID;
        let result
        result = await follow.findOne({ clientId })
        if (!result) {
            result = await follow.create({ clientId })
        }
        if (!result.following.includes(userID)) {
            await follow.findOneAndUpdate({ clientId: id }, { $push: { "following": userID } }, { new: true })
            return res.json({
                success: true,
                message: "Follow"
            })
        } else {
            await follow.findOneAndUpdate({ clientId: id }, { $pull: { "following": userID } }, { new: true })
            return res.json({
                success: true,
                message: "UnFollow",
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error ${error}`,
        })
    }
}

exports.getAllFollowers = async (req, res) => {
    try {
        const { id } = req.params
        let result = await follow.findOne({ clientId: id }, { __v: 0 })
            .populate('following', { _id: 1, username: 1, fullName: 1, profile: 1 }).populate('clientId', '-active -password -gender -phone -website -createdAt -updatedAt -__v -Saved')
        if (!result) {
            result = []
        }
        res.json({
            success: true,
            message: "Got All Followers",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error ${error}`,
        })
    }
}
exports.getAllFollowersPost = async (req, res) => {
    try {
        const token = req.headers.authorization
        const { id } = jwt.verify(token, process.env.JWT_KEY)
        var result
        const allFollwers = await follow.findOne({ clientId: id }).populate('following', { _id: 1, username: 1, fullName: 1, profile: 1 })
        // console.log(allFollwers);
        if (!allFollwers) {
            result = []
            return res.json({
                success: true,
                message: "No Followers",
                result
            })
        }

        const d = allFollwers.following.map(async item => {
            const x = await post.find({ userId: item._id }, { __v: 0, createdAt: 0, updatedAt: 0 }).populate('comments.reviewer', '-createdAt -updatedAt -__v')
                .populate('userId', { _id: 1, username: 1, fullName: 1, profile: 1 })
            // console.log(x);
            return x
        });
        result = await Promise.all(d)
        // console.log(result);
        res.json({
            success: true,
            message: "Got All Followers Post",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error ${error}`,
        })
    }
}