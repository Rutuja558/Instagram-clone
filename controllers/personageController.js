const post = require("../models/postModel")
const jwt = require("jsonwebtoken")

exports.handlePostLiked = async (req, res) => {
    try {
        const token = req.headers.authorization
        const { id } = jwt.verify(token, process.env.JWT_KEY)
        const postId = req.body.postId;
        // console.log(postId);
        const result = await post.findById(postId)
        if (!result.likes.includes(id)) {
            await post.findOneAndUpdate({ _id: postId }, { $push: { likes: id } }, { new: true })
            return res.json({
                success: true,
                message: "Post Liked",
            })
        } else {
            await post.findOneAndUpdate({ _id: postId }, { $pull: { "likes": id } }, { new: true })
            return res.json({
                success: true,
                message: "Post Unliked",
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error ${error}`,
        })
    }
}
exports.addComment = async (req, res) => {
    try {
        const token = req.headers.authorization
        const { id: reviewer } = jwt.verify(token, process.env.JWT_KEY)
        const postId = req.body.postId;
        const comment = req.body.comment
        // const result = await post.findById(postId)
        await post.findOneAndUpdate({ _id: postId }, { $push: { comments: { reviewer, comment } } }, { new: true })
        res.json({
            success: true,
            message: "Comment Added",
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error ${error}`,
        })
    }
}