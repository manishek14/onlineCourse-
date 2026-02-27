const express = require("express");
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");
const controler = require("../../controllers/v1/comment")

const router = express.Router();

router.route("/").get(authMiddle.authenticate, isAdminMiddle, controler.getAll)
router.route("/create").post(authMiddle.authenticate, controler.createComment)
router.route("/rmComment/:id").delete(authMiddle.authenticate , isAdminMiddle, controler.rmComment)
router.route("/acComment/:id").put(authMiddle.authenticate, isAdminMiddle, controler.acceptComment)
router.route("/answer/:id").put(authMiddle.authenticate, controler.answerComment)

module.exports = router;