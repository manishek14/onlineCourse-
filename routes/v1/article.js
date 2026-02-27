const express = require("express");
const controller = require("../../controllers/v1/article");
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");
const uploader = require("../../utils/uploader");
const multer = require("multer");

const router = express.Router();

router.route("/").get(controller.getAll);
router.route("/create").post(
  authMiddle.authenticate,
  isAdminMiddle,
  uploader.fields([
    { name: "cover", maxCount: 1 },
    { name: "content", maxCount: 15 },
  ]),
  controller.create,
);
router.route("/:href").get(controller.getOne);
router
  .route("/:id")
  .delete(authMiddle.authenticate, isAdminMiddle, controller.remove);
router.route("/draft/:id").put(
  authMiddle.authenticate,
  isAdminMiddle,
  uploader.fields([
    { name: "cover", maxCount: 1 },
    { name: "content", maxCount: 15 },
  ]),
  controller.saveDraft,
);

module.exports = router;
