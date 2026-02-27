const express = require("express");
const controller = require("../../controllers/v1/contact");
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");

const router = express.Router();

router.route("/").get(authMiddle.authenticate,  isAdminMiddle, controller.getAll);
router.route("/create").post(authMiddle.authenticate, isAdminMiddle, controller.create);
router.route("/answer").post(authMiddle.authenticate, isAdminMiddle, controller.answer);
router.route("/remove/:id").delete(authMiddle.authenticate, isAdminMiddle, controller.remove);

module.exports = router;
