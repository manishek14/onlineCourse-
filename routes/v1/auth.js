const express = require("express")
const controller = require("../../controllers/v1/auth")
const { authenticate } = require("../../middleware/auth")

const router = express.Router()

router.post("/login" , controller.login)
router.post("/register" , controller.register)
router.get("/me" , authenticate, controller.getMe)
router.post("/refreshToken" , controller.refreshToken)
router.post("/rememberMe" , authenticate, controller.remember)
router.post("/sms/code" , controller.sendOtp)
router.post("/sms/verify" , controller.verifyOtp)

module.exports = router