const express = require("express")
const controller = require("../../controllers/v1/user")
const authMiddle = require("../../middleware/auth")
const isAdminMiddle = require("../../middleware/isAdmin")

const router = express.Router()
router
    .route("/")
    .get(authMiddle.authenticate , isAdminMiddle , controller.getAll)
 
    router.route("/rm/:id").delete(authMiddle.authenticate , isAdminMiddle , controller.rmUser)

router
    .route("/ban/:id")
    .post(authMiddle.authenticate, isAdminMiddle, controller.ban)
module.exports = router
