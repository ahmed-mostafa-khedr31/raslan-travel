const express = require("express");
const router = express.Router();
const multerUpload = require("../utils/multerUplad");
const {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const verifyToken = require("../middleware/verifyToken");
const authorize = require("../middleware/authorize");
const Roles = require("../utils/roles");
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Users list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UsersResponse"
 *       401:
 *         description: Token is missing or invalid
 *       403:
 *         description: Admin only
 */
router.get("/users", verifyToken, authorize(Roles.ADMIN), getUsers);

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Users]
 *     summary: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/RegisterInput"
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthResponse"
 *       400:
 *         description: Password mismatch or email already exists
 */
router.post("/register", multerUpload.single("avatar"), register);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Users]
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginInput"
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthResponse"
 *       400:
 *         description: Email or password is missing
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 */
router.post("/login", login);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/UpdateUserInput"
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserResponse"
 *       400:
 *         description: Password mismatch
 *       401:
 *         description: Token is missing or invalid
 *       403:
 *         description: Admin only
 *       404:
 *         description: User not found
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       401:
 *         description: Token is missing or invalid
 *       403:
 *         description: Admin only
 *       404:
 *         description: User not found
 */
router
  .route("/users/:id")
  .patch(
    verifyToken,
    authorize(Roles.ADMIN),
    multerUpload.single("avatar"),
    updateUser,
  )
  .delete(verifyToken, authorize(Roles.ADMIN), deleteUser);
module.exports = router;
