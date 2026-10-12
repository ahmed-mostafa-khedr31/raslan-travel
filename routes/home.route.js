const express = require("express");
const {
  getHome,
  postHome,
  patchHome,
  patchBanner,
  patchAbout,
  patchFeatures,
  patchTestimonials,
  patchContact,
} = require("../controllers/home.controller");
const verifyToken = require("../middleware/verifyToken");
const authorize = require("../middleware/authorize");
const Roles = require("../utils/roles");
const router = express.Router();

/**
 * @swagger
 * /home:
 *   get:
 *     tags: [Home]
 *     summary: Get the home page
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Home page object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PageResponse"
 *       401:
 *         description: Token is missing or invalid
 *   post:
 *     tags: [Home]
 *     summary: Save the home page
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Page"
 *     responses:
 *       200:
 *         description: Saved home page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PageResponse"
 *   patch:
 *     tags: [Home]
 *     summary: Update the home page
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Page"
 *     responses:
 *       200:
 *         description: Updated home page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PageResponse"
 */
router.get("/", verifyToken, authorize(Roles.ADMIN || Roles.USER), getHome);
router.post("/", verifyToken, authorize(Roles.ADMIN || Roles.USER), postHome);
router.patch("/", verifyToken, authorize(Roles.ADMIN || Roles.USER), patchHome);

/**
 * @swagger
 * /home/banner:
 *   patch:
 *     tags: [Home]
 *     summary: Update the home banner
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               banner:
 *                 $ref: "#/components/schemas/Banner"
 *     responses:
 *       200:
 *         description: Updated home page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PageResponse"
 */
router.patch(
  "/banner",
  verifyToken,
  authorize(Roles.ADMIN || Roles.USER),
  patchBanner,
);

/**
 * @swagger
 * /home/about:
 *   patch:
 *     tags: [Home]
 *     summary: Update the home about section
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               about:
 *                 $ref: "#/components/schemas/AboutSection"
 *     responses:
 *       200:
 *         description: Updated home page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PageResponse"
 */
router.patch(
  "/about",
  verifyToken,
  authorize(Roles.ADMIN || Roles.USER),
  patchAbout,
);

/**
 * @swagger
 * /home/features:
 *   patch:
 *     tags: [Home]
 *     summary: Update the home features section
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               features:
 *                 $ref: "#/components/schemas/Features"
 *     responses:
 *       200:
 *         description: Updated home page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PageResponse"
 */
router.patch(
  "/features",
  verifyToken,
  authorize(Roles.ADMIN || Roles.USER),
  patchFeatures,
);

/**
 * @swagger
 * /home/testimonials:
 *   patch:
 *     tags: [Home]
 *     summary: Update the home testimonials section
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               testimonials:
 *                 $ref: "#/components/schemas/Testimonials"
 *     responses:
 *       200:
 *         description: Updated home page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PageResponse"
 */
router.patch(
  "/testimonials",
  verifyToken,
  authorize(Roles.ADMIN || Roles.USER),
  patchTestimonials,
);

/**
 * @swagger
 * /home/contact:
 *   patch:
 *     tags: [Home]
 *     summary: Update the home contact section
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contact:
 *                 $ref: "#/components/schemas/Contact"
 *     responses:
 *       200:
 *         description: Updated home page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PageResponse"
 */
router.patch(
  "/contact",
  verifyToken,
  authorize(Roles.ADMIN || Roles.USER),
  patchContact,
);

module.exports = router;
