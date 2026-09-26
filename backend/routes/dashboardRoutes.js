const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Aggregate stats for the dashboard page
 */

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard summary stats
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Totals and counts across customers, vehicles and rentals
 *       500:
 *         description: Server error
 */
router.get('/stats', dashboardController.getDashboardStats);

module.exports = router;