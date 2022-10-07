const mongoose = require("mongoose")

const postsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    image: {
        type: String
    },
    caption: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [
        {
            reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            comment: { type: String }
        }
    ]
}, { timestamps: true })
module.exports = mongoose.model("post", postsSchema)