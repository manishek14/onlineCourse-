const express = require("express")
const controller = require("../../controllers/v1/order")
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");

const router = express.Router()

router.route("/").get(authMiddle.authenticate , isAdminMiddle, controller.getAll)
router.route("/:id").get(authMiddle.authenticate , isAdminMiddle, controller.getOne)

module.exports = router