const express = require("express")
require("colors")
require("dotenv").config({ path: "./config/.env" })
const cors = require("cors")
const app = express()
const userRoute = require("./routes/userRoutes")
const authRoute = require("./routes/authRoutes")
const postRoute = require("./routes/postRoutes")
const personageRoute = require("./routes/personageRoutes")
const followRoute = require("./routes/followRoute")
const { db } = require("./config/db")
db()

// static
app.use(express.static("public"))
app.use(express.static("client/build"))

app.use(express.json())
app.use(cors())

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/user/post", postRoute)
app.use("/api/user", personageRoute)
app.use("/api/user", followRoute)


const PORT = process.env.PORT || 5000
app.listen(PORT, err => {
    err && console.log("unable to start server", err);
    console.log(`SERVER RUNNING ON http://localhost:${PORT}`.bgCyan);
})