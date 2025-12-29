require("./configs/db")
const app = require("./app")
const path = require ("path")
require("dotenv").config({ path: "./N303-/.env" })

console.log("PORT from env:", process.env.PORT, typeof process.env.PORT)
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})