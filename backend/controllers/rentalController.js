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

// POST /api/rentals, this checks the customer & vehicle are real, then books it in
async function createRental(req, res) {
  try {
    const { customer_id, vehicle_id, start_date, end_date, status } = req.body;

    if (!customer_id || !vehicle_id || !start_date || !end_date) {
      return res.status(400).json({ message: 'customer_id, vehicle_id, start_date and end_date are all required' });
      }
    }

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

// POST /api/rentals - checks whether the customer & vehicle are real, then book it in
async function createRental(req, res) {
  try {
    const { customer_id, vehicle_id, start_date, end_date, status } = req.body;

    if (!customer_id || !vehicle_id || !start_date || !end_date) {
      return res.status(400).json({ message: 'customer_id, vehicle_id, start_date and end_date are all required' });
    }

    // This checks so there is no booking a rental for a customer or vehicle that doesn't exist
    const customer = await customerModel.getCustomerById(customer_id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const vehicle = await vehicleModel.getVehicleById(vehicle_id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const start = new Date(start_date);
    const end = new Date(end_date);

    if (end <= start) {
      return res.status(400).json({ message: 'end_date must be after start_date' });
    }
 // this helps us to work out the number of days, then price it off the vehicle's daily_rate
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const total_price = days * Number(vehicle.daily_rate);

    const newRental = await rentalModel.createRental({
      customer_id,
      vehicle_id,
      start_date,
      end_date,
      total_price,
      status: status || 'booked',
    });

    res.status(201).json(newRental);
  } catch (error) {
    res.status(500).json({ message: 'Error creating rental', error: error.message });
  }
}

// PUT /api/rentals/:id - update the rental and re-price it in case dates changed
async function updateRental(req, res) {
  try {
    const { customer_id, vehicle_id, start_date, end_date, status } = req.body;

    if (!customer_id || !vehicle_id || !start_date || !end_date) {
      return res.status(400).json({ message: 'customer_id, vehicle_id, start_date and end_date are all required' });
    }

    const customer = await customerModel.getCustomerById(customer_id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const vehicle = await vehicleModel.getVehicleById(vehicle_id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const start = new Date(start_date);
    const end = new Date(end_date);
 if (end <= start) {
      return res.status(400).json({ message: 'end_date must be after start_date' });
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const total_price = days * Number(vehicle.daily_rate);

    const updated = await rentalModel.updateRental(req.params.id, {
      customer_id,
      vehicle_id,
      start_date,
      end_date,
      total_price,
      status: status || 'booked',
    });
     if (!updated) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    res.status(200).json({ message: 'Rental updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating rental', error: error.message });
  }
}