const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Manage customer records
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: A list of customers
 *       500:
 *         description: Server error
 */
router.get('/', customerController.getAllCustomers);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Get a single customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer's ID (e.g. CID-0001)
 *     responses:
 *       200:
 *         description: The matching customer
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.get('/:id', customerController.getCustomerById);

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - driving_license
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               driving_license:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/', customerController.createCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update an existing customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer's ID (e.g. CID-0001)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - driving_license
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               driving_license:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.put('/:id', customerController.updateCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer's ID (e.g. CID-0001)
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;