const rentalModel = require('../models/rentalModel');
const customerModel = require('../models/customerModel');
const vehicleModel = require('../models/vehicleModel');

// GET /api/rentals
async function getAllRentals(req, res) {
  try {
    const rentals = await rentalModel.getAllRentals();
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving rentals', error: error.message });
  }
}