const express = require("express")
const app = express()
const cors = require("cors")
const helmet = require("helmet")
const path = require("path")
const authRouter = require("./routes/v1/auth")

app.use(express.urlencoded({ extended : false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use("/course/covers" ,express.static(path.join(__dirname , "public" , "course" , "covers")))

app.use("/v1/auth" , authRouter) 

module.exports = app

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({ error: err.message })
})


