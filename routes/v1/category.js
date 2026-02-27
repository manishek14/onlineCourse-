const express = require("express");
const controller = require("../../controllers/v1/category");
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");

const router = express.Router();

router
  .route("/")
  .get(authMiddle.authenticate, isAdminMiddle, controller.getAllCats);

router
  .route("/create")
  .post(authMiddle.authenticate, isAdminMiddle, controller.createCats);

router
  .route("/:id")
  .delete(authMiddle.authenticate, isAdminMiddle, controller.rmCats)
router
  .route("/update/:id")
  .put(authMiddle.authenticate, isAdminMiddle, controller.updateCats);

module.exports = router;
