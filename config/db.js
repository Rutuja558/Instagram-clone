const mongoose = require("mongoose")
require("colors")
exports.db = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("MONGODB Connected".bgGreen);
    } catch (error) {
        console.log(`unable to connect ${error}`.bgRed);
    }
}