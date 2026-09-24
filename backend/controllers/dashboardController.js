const customerModel = require('../models/customerModel');
const vehicleModel = require('../models/vehicleModel');
const rentalModel = require('../models/rentalModel');

// GET /api/dashboard/stats - pull the numbers together for the dashboard cards
async function getDashboardStats(req, res) {
  try {
    const customers = await customerModel.getAllCustomers();
    const vehicles = await vehicleModel.getAllVehicles();
    const rentals = await rentalModel.getAllRentals();

    const activeRentals = rentals.filter((rental) => rental.status === 'active').length;
    const availableVehicles = vehicles.filter((vehicle) => vehicle.status === 'available').length;

    res.status(200).json({
      totalCustomers: customers.length,
      totalVehicles: vehicles.length,
      totalRentals: rentals.length,
      activeRentals,
      availableVehicles,
    });
  } catch (error) {
    res.status(500).json({ message: 'There is an Error retrieving dashboard stats', error: error.message });
  }
}

module.exports = {
  getDashboardStats,
};