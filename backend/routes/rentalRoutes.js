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
 router.get('/', rentalController.getAllRentals);

 /**
 * @swagger
 * /api/rentals/{id}:
 *   get:
 *     summary: Get a single rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The rental's ID
 *     responses:
 *       200:
 *         description: The matching rental
 *       404:
 *         description: Rental not found
 *       500:
 *         description: Server error
 */
router.get('/:id', rentalController.getRentalById);
