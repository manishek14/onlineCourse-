const express = require("express");
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");
const controller = require("../../controllers/v1/course");
const uploader = require("../../utils/uploader");

const router = express.Router();

/**
 * @swagger
 * /v1/courses:
 *   get:
 *     tags: [Courses]
 *     summary: Get all courses
 *     description: Retrieve a list of all available courses
 *     responses:
 *       200:
 *         description: List of courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/").get(controller.getAlls);

/**
 * @swagger
 * /v1/courses/status:
 *   get:
 *     tags: [Courses]
 *     summary: Get course status
 *     description: Get status information about courses
 *     responses:
 *       200:
 *         description: Course status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCourses:
 *                   type: number
 *                   example: 150
 *                 publishedCourses:
 *                   type: number
 *                   example: 120
 *                 draftCourses:
 *                   type: number
 *                   example: 30
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/status").get(controller.getStatus);

/**
 * @swagger
 * /v1/courses/create:
 *   post:
 *     tags: [Courses]
 *     summary: Create a new course (Admin only)
 *     description: Create a new course with cover image and video
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete React Course
 *               description:
 *                 type: string
 *                 example: Learn React from scratch to advanced
 *               price:
 *                 type: number
 *                 example: 299000
 *               discount:
 *                 type: number
 *                 example: 20
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               cover:
 *                 type: string
 *                 format: binary
 *                 description: Course cover image
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Course introduction video
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Course created successfully
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Admin access required
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/create")
  .post(
    uploader.fields([{ name: "cover" }, { name: "video" }]),
    authMiddle.authenticate,
    isAdminMiddle,
    controller.create
  );

/**
 * @swagger
 * /v1/courses/{id}/session:
 *   get:
 *     tags: [Courses]
 *     summary: Get course sessions
 *     description: Retrieve all sessions for a specific course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Sessions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   video:
 *                     type: string
 *                   duration:
 *                     type: number
 *                   free:
 *                     type: boolean
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   post:
 *     tags: [Courses]
 *     summary: Create course session (Admin only)
 *     description: Add a new session to a course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - video
 *             properties:
 *               title:
 *                 type: string
 *                 example: Introduction to React Hooks
 *               video:
 *                 type: string
 *                 format: binary
 *               duration:
 *                 type: number
 *                 example: 1800
 *               free:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Session created successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Admin access required
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/:id/session")
  .get(controller.getSessions)
  .post(
    uploader.fields([{ name: "video" }]),
    authMiddle.authenticate,
    isAdminMiddle,
    controller.createSession
  );

/**
 * @swagger
 * /v1/courses/category/{href}:
 *   get:
 *     tags: [Courses]
 *     summary: Get courses by category
 *     description: Retrieve all courses in a specific category
 *     parameters:
 *       - in: path
 *         name: href
 *         required: true
 *         schema:
 *           type: string
 *         description: Category URL slug
 *         example: programming
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/category/:href").get(controller.getCourses);

/**
 * @swagger
 * /v1/courses/{href}/{sessionID}:
 *   get:
 *     tags: [Courses]
 *     summary: Get session details (Admin only)
 *     description: Get detailed information about a specific session
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: href
 *         required: true
 *         schema:
 *           type: string
 *         description: Course URL slug
 *       - in: path
 *         name: sessionID
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Session details retrieved successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Admin access required
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/:href/:sessionID")
  .get(authMiddle.authenticate, isAdminMiddle, controller.getAllSessionInfo);

/**
 * @swagger
 * /v1/courses/session/{id}:
 *   delete:
 *     tags: [Courses]
 *     summary: Delete session (Admin only)
 *     description: Remove a session from a course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Admin access required
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/session/:id")
  .delete(authMiddle.authenticate, isAdminMiddle, controller.rmSession);

/**
 * @swagger
 * /v1/courses/{id}/register:
 *   post:
 *     tags: [Courses]
 *     summary: Register for a course
 *     description: Enroll authenticated user in a course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Successfully registered for course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully registered for course
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         description: Already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Already registered for this course
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/:id/register")
  .post(authMiddle.authenticate, controller.register);

/**
 * @swagger
 * /v1/courses/{href}:
 *   get:
 *     tags: [Courses]
 *     summary: Get course details
 *     description: Get detailed information about a specific course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: href
 *         required: true
 *         schema:
 *           type: string
 *         description: Course URL slug
 *         example: complete-react-course
 *     responses:
 *       200:
 *         description: Course details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/:href").get(authMiddle.authenticate, controller.getDetails);

/**
 * @swagger
 * /v1/courses/rmCourse/{id}:
 *   delete:
 *     tags: [Courses]
 *     summary: Delete course (Admin only)
 *     description: Permanently delete a course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Admin access required
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/rmCourse/:id")
  .delete(authMiddle.authenticate, isAdminMiddle, controller.rmCourse);

/**
 * @swagger
 * /v1/courses/related/{href}:
 *   get:
 *     tags: [Courses]
 *     summary: Get related courses
 *     description: Get courses related to a specific course
 *     parameters:
 *       - in: path
 *         name: href
 *         required: true
 *         schema:
 *           type: string
 *         description: Course URL slug
 *     responses:
 *       200:
 *         description: Related courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/related/:href").get(controller.relatedCourses);

module.exports = router;
