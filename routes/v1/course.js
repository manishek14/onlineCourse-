const express = require("express");
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");
const controller = require("../../controllers/v1/course");
const uploader = require("../../utils/uploader");

const router = express.Router();

router.route("/status").get(controller.getStatus);

router.route("/").get(controller.getAlls);

router
  .route("/create")
  .post(
    uploader.fields([{ name: "cover" }, { name: "video" }]),
    authMiddle.authenticate,
    isAdminMiddle,
    controller.create
  );

router
  .route("/:id/session")
  .get(controller.getSessions)
  .post(
    uploader.fields([{ name: "video" }]),
    authMiddle.authenticate,
    isAdminMiddle,
    controller.createSession
  );

router.route("/category/:href").get(controller.getCourses);

router
  .route("/:href/:sessionID")
  .get(authMiddle.authenticate, isAdminMiddle, controller.getAllSessionInfo);

router
  .route("/session/:id")
  .delete(authMiddle.authenticate, isAdminMiddle, controller.rmSession);

router
  .route("/:id/register")
  .post(authMiddle.authenticate, controller.register);

router.route("/:href").get(authMiddle.authenticate, controller.getDetails);

router
  .route("/rmCourse/:id")
  .delete(authMiddle.authenticate, isAdminMiddle, controller.rmCourse);

router.route("/related/:href").get(controller.relatedCourses);

module.exports = router;
