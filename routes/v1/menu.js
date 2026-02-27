const express = require("express")
const controller = require("../../controllers/v1/menu")
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");

const router = express.Router()

router.route("/").get(controller.getAllMenus)
router.route("/create").post(authMiddle.authenticate , isAdminMiddle, controller.create)
router.route("/all").get(controller.getAll)
router.route("/remove/:id").delete(controller.remove)


module.exports = router