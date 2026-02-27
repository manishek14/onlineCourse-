const express = require("express");
const controller = require("../../controllers/v1/search");
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");

const router = express.Router();

/**
 * @swagger
 * /v1/search:
 *   get:
 *     tags: [Search]
 *     summary: Search courses and articles (Admin only)
 *     description: Search for courses and articles by keyword
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query keyword
 *         example: react
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [course, article, all]
 *         description: Type of content to search
 *         example: course
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *         description: Maximum number of results
 *         example: 20
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       cover:
 *                         type: string
 *                 total:
 *                   type: number
 *                   example: 15
 *       400:
 *         description: Missing search query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Search query is required
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Admin access required
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.route("/").get(authMiddle.authenticate, isAdminMiddle, controller.getResult);

module.exports = router;
