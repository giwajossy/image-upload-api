const express = require("express")
const app = express()

const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

// connect db
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("MongoDB is connected"))
.catch((err)=> console.log(err))

// middleware
app.use(express.json())

// route
app.use("/api/v1/user", require("./routes/user"))

app.listen(3000, ()=> console.log("Server is running"))