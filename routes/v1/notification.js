const express = require("express")
const controller = require("../../controllers/v1/notification")
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");

const router = express.Router()

router.route("/").get(authMiddle.authenticate , isAdminMiddle, controller.getAll)
router.route("/create").post(authMiddle.authenticate , isAdminMiddle, controller.create)
router.route("/:adminID").get(authMiddle.authenticate , isAdminMiddle, controller.getAdmin)
router.route("/seen/:id").put(authMiddle.authenticate , isAdminMiddle, controller.seen)
router.route("/remove/:id").put(authMiddle.authenticate , isAdminMiddle ,controller.remove)

module.exports = router