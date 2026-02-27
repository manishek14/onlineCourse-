const express = require("express")
const controller = require("../../controllers/v1/search")
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");

const router = express.Router()

router.route("/").get(authMiddle.authenticate , isAdminMiddle , controller.getResult)

module.exports = router