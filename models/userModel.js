const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: "profiles/default.jpg"
    },
    active: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    Bio: {
        type: String,
        default: ''
    },
    Saved: {
        type: Array,
        default: []
    }
}, { timestamps: true })
module.exports = mongoose.model("user", userSchema)