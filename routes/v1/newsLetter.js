const express = require("express")
const controller = require("../../controllers/v1/newsLetter")
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");

const router = express.Router()

router.route("/").get(authMiddle.authenticate , isAdminMiddle, controller.getAll)
router.route("/create").post(authMiddle.authenticate , isAdminMiddle, controller.create)

module.exports = router