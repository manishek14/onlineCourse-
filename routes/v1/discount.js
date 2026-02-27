const express = require("express")
const controller = require("../../controllers/v1/discount")
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");

const router = express.Router()

router.route("/").get(authMiddle.authenticate , isAdminMiddle, controller.getAll)
router.route("/create").post(authMiddle.authenticate , isAdminMiddle, controller.create)
router.route("/all").post(authMiddle.authenticate , isAdminMiddle, controller.setOnAll)
router.route("/:code").get(authMiddle.authenticate , controller.getOne)
router.route("/remove/:id").delete(authMiddle.authenticate , isAdminMiddle, controller.remove)

module.exports = router