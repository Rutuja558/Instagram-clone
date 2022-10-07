const mongoose = require("mongoose")

const followSchema = mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    following: [
        {
            type: mongoose.Types.ObjectId,
            ref: "user"
        }
    ]
})
module.exports = mongoose.model("follow", followSchema)