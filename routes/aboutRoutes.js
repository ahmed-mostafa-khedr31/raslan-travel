const express = require("express");
const {
  getAbout,
  postAbout,
  patchAboutData,
  patchBanner,
  patchAbout,
  patchFeatures,
  patchTestimonials,
  patchContact,
} = require("../controllers/aboutController");

const router = express.Router();

/**
 * @swagger
 * /about:
 *   get:
 *     tags: [About]
 *     summary: Get the about page
 *     responses:
 *       200:
 *         description: About page object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PageResponse"
 *   post:
 *     tags: [About]
 *     summary: Save the about page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Page"
 *     responses:
 *       200:
 *         description: Saved about page
 *   patch:
 *     tags: [About]
 *     summary: Update the about page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Page"
 *     responses:
 *       200:
 *         description: Updated about page
 */
router.get("/", getAbout);
router.post("/", postAbout);
router.patch("/", patchAboutData);

/**
 * @swagger
 * /about/banner:
 *   patch:
 *     tags: [About]
 *     summary: Update the about banner
 *     responses:
 *       200:
 *         description: Updated about page
 */
router.patch("/banner", patchBanner);

/**
 * @swagger
 * /about/about:
 *   patch:
 *     tags: [About]
 *     summary: Update the about section
 *     responses:
 *       200:
 *         description: Updated about page
 */
router.patch("/about", patchAbout);

/**
 * @swagger
 * /about/features:
 *   patch:
 *     tags: [About]
 *     summary: Update the about features section
 *     responses:
 *       200:
 *         description: Updated about page
 */
router.patch("/features", patchFeatures);

/**
 * @swagger
 * /about/testimonials:
 *   patch:
 *     tags: [About]
 *     summary: Update the about testimonials section
 *     responses:
 *       200:
 *         description: Updated about page
 */
router.patch("/testimonials", patchTestimonials);

/**
 * @swagger
 * /about/contact:
 *   patch:
 *     tags: [About]
 *     summary: Update the about contact section
 *     responses:
 *       200:
 *         description: Updated about page
 */
router.patch("/contact", patchContact);

module.exports = router;
