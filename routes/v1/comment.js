const express = require("express");
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");
const controler = require("../../controllers/v1/comment");

const router = express.Router();

/**
 * @swagger
 * /v1/comments:
 *   get:
 *     tags: [Comments]
 *     summary: Get all comments (Admin only)
 *     description: Retrieve all comments from all courses and articles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 507f1f77bcf86cd799439011
 *                   body:
 *                     type: string
 *                     example: Great course! Very helpful
 *                   user:
 *                     $ref: '#/components/schemas/User'
 *                   course:
 *                     type: string
 *                     example: 507f1f77bcf86cd799439011
 *                   isAccepted:
 *                     type: boolean
 *                     example: false
 *                   score:
 *                     type: number
 *                     example: 5
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Admin access required
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/").get(authMiddle.authenticate, isAdminMiddle, controler.getAll);

/**
 * @swagger
 * /v1/comments/create:
 *   post:
 *     tags: [Comments]
 *     summary: Create a comment
 *     description: Add a new comment to a course or article
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - body
 *               - courseId
 *             properties:
 *               body:
 *                 type: string
 *                 example: This is an excellent course! I learned a lot.
 *               courseId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               score:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment created successfully and is pending approval
 *                 comment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     body:
 *                       type: string
 *                     user:
 *                       type: string
 *                     course:
 *                       type: string
 *                     isAccepted:
 *                       type: boolean
 *                       example: false
 *                     score:
 *                       type: number
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Course not found
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/create").post(authMiddle.authenticate, controler.createComment);

/**
 * @swagger
 * /v1/comments/rmComment/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete comment (Admin only)
 *     description: Permanently delete a comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment deleted successfully
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
  .route("/rmComment/:id")
  .delete(authMiddle.authenticate, isAdminMiddle, controler.rmComment);

/**
 * @swagger
 * /v1/comments/acComment/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Accept/Approve comment (Admin only)
 *     description: Approve a pending comment to be displayed publicly
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Comment accepted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment accepted successfully
 *                 comment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     body:
 *                       type: string
 *                     isAccepted:
 *                       type: boolean
 *                       example: true
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
  .route("/acComment/:id")
  .put(authMiddle.authenticate, isAdminMiddle, controler.acceptComment);

/**
 * @swagger
 * /v1/comments/answer/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Reply to a comment
 *     description: Add a reply to an existing comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID to reply to
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - body
 *             properties:
 *               body:
 *                 type: string
 *                 example: Thank you for your feedback! We're glad you enjoyed the course.
 *     responses:
 *       200:
 *         description: Reply added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reply added successfully
 *                 comment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     body:
 *                       type: string
 *                     answer:
 *                       type: string
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/answer/:id")
  .put(authMiddle.authenticate, controler.answerComment);

module.exports = router;
