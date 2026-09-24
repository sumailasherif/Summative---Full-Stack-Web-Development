const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: Manage vehicle rental bookings
 */

/**
 * @swagger
 * /api/rentals:
 *   get:
 *     summary: Get all rentals
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: A list of rentals
 *       500:
 *         description: Server error
 */
 */
router.get('/', rentalController.getAllRentals);