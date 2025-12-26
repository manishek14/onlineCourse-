const express = require("express")
const app = express()

module.exports = app

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({ error: err.message })
})