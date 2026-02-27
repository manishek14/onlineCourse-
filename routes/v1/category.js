const express = require("express");
const controller = require("../../controllers/v1/category");
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");

const router = express.Router();

/**
 * @swagger
 * /v1/category:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories (Admin only)
 *     description: Retrieve a list of all course categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
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
 *                   title:
 *                     type: string
 *                     example: Programming
 *                   href:
 *                     type: string
 *                     example: programming
 *                   description:
 *                     type: string
 *                     example: Programming and software development courses
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
router
  .route("/")
  .get(authMiddle.authenticate, isAdminMiddle, controller.getAllCats);

/**
 * @swagger
 * /v1/category/create:
 *   post:
 *     tags: [Categories]
 *     summary: Create category (Admin only)
 *     description: Create a new course category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - href
 *             properties:
 *               title:
 *                 type: string
 *                 example: Web Development
 *               href:
 *                 type: string
 *                 example: web-development
 *               description:
 *                 type: string
 *                 example: Learn web development from basics to advanced
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category created successfully
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     href:
 *                       type: string
 *                     description:
 *                       type: string
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Admin access required
 *       409:
 *         description: Category already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category with this href already exists
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/create")
  .post(authMiddle.authenticate, isAdminMiddle, controller.createCats);

/**
 * @swagger
 * /v1/category/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Delete category (Admin only)
 *     description: Permanently delete a category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Admin access required
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         description: Category has associated courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot delete category with associated courses
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/:id")
  .delete(authMiddle.authenticate, isAdminMiddle, controller.rmCats);

/**
 * @swagger
 * /v1/category/update/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Update category (Admin only)
 *     description: Update an existing category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Advanced Web Development
 *               href:
 *                 type: string
 *                 example: advanced-web-development
 *               description:
 *                 type: string
 *                 example: Advanced topics in web development
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category updated successfully
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     href:
 *                       type: string
 *                     description:
 *                       type: string
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Admin access required
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         description: Category href already exists
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router
  .route("/update/:id")
  .put(authMiddle.authenticate, isAdminMiddle, controller.updateCats);

module.exports = router;
