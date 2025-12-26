const app = require("./app")
const mongoose = require("mongoose")
const path = require ("path")
require("dotenv").config({ path: "./N303-/.env" })

console.log("PORT from env:", process.env.PORT, typeof process.env.PORT)
const port = process.env.PORT || 3000

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
})()

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})