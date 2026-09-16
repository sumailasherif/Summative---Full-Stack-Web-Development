const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Manage vehicle records
 */

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: A list of vehicles
 *       500:
 *         description: Server error
 */
router.get('/', vehicleController.getAllVehicles);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get a single vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle's ID (e.g. VID-0001)
 *     responses:
 *       200:
 *         description: The matching vehicle
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */
router.get('/:id', vehicleController.getVehicleById);

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - model
 *               - registration_number
 *               - daily_rate
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               registration_number:
 *                 type: string
 *               daily_rate:
 *                 type: number
 *               status:
 *                 type: string
 *                 description: Defaults to "available" if not provided
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       400:
 *         description: Missing required fields, or daily_rate is negative
 *       500:
 *         description: Server error
 */
router.post('/', vehicleController.createVehicle);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Update an existing vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle's ID (e.g. VID-0001)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - model
 *               - registration_number
 *               - daily_rate
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               registration_number:
 *                 type: string
 *               daily_rate:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       400:
 *         description: Missing required fields, or daily_rate is negative
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */
router.put('/:id', vehicleController.updateVehicle);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle's ID (e.g. VID-0001)
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;