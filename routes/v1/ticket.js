const express = require("express")
const controller = require("../../controllers/v1/ticket")
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");

const router = express.Router()

router.route("/").get(authMiddle.authenticate , isAdminMiddle , controller.getAll)
router.route("/create").get(authMiddle.authenticate , controller.create)
router.route("/user").get(authMiddle.authenticate , controller.userTickets)
router.route("/remove").get(authMiddle.authenticate , isAdminMiddle , controller.remove)

router.route("/department").get(controller.department)
router.route("/department/sub/:id").get(controller.departmentSub)

router.route("/answer").get(authMiddle.authenticate , isAdminMiddle , controller.setAnswer)
router.route("/answer/:id").get(authMiddle.authenticate , controller.getAnswer)

module.exports = router