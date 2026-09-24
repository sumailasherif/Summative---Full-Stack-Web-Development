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


/**
 * @swagger
 * /api/rentals:
 *   post:
 *     summary: Create a new rental
 *     tags: [Rentals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - vehicle_id
 *               - start_date
 *               - end_date
 *             properties:
 *               customer_id:
 *                 type: string
 *                 example: CID-0001
 *               vehicle_id:
 *                 type: string
 *                 example: VID-0001
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 example: booked
 *     responses:
 *       201:
 *         description: Rental created successfully (total_price is calculated automatically)
 *       400:
 *         description: Missing required fields, or end_date is not after start_date
 *       404:
 *         description: Customer or vehicle not found
 *       500:
 *         description: Server error
 */
router.post('/', rentalController.createRental);