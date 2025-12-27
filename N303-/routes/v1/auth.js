const exports = require("express")
const controller = require("../../controllers/v1/auth")

const router = exports.Route()

router.post("/login" , controller.login)
router.post("/register" , controller.register)
router.get("/me" , controller.getMe)

module.exports = router