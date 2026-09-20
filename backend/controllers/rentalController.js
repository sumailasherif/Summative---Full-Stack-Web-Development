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

// GET /api/rentals/:id - find the one rental we're after
async function getRentalById(req, res) {
  try {
    const rental = await rentalModel.getRentalById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving rental', error: error.message });
  }
}