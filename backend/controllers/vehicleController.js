const vehicleModel = require('../models/vehicleModel');

// GET /api/vehicles
async function getAllVehicles(req, res) {
  try {
    const vehicles = await vehicleModel.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving vehicles', error: error.message });
  }
}

// GET /api/vehicles/:id
async function getVehicleById(req, res) {
  try {
    const vehicle = await vehicleModel.getVehicleById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving vehicle', error: error.message });
  }
}

// POST /api/vehicles
async function createVehicle(req, res) {
  try {
    const { brand, model, registration_number, daily_rate, status } = req.body;

    if (!brand || !model || !registration_number || daily_rate === undefined) {
      return res.status(400).json({ message: 'brand, model, registration_number and daily_rate are all required' });
    }

    if (daily_rate < 0) {
      return res.status(400).json({ message: 'daily_rate cannot be negative' });
    }

    const newVehicle = await vehicleModel.createVehicle({ brand, model, registration_number, daily_rate, status });
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error: error.message });
  }
}

// PUT /api/vehicles/:id
async function updateVehicle(req, res) {
  try {
    const { brand, model, registration_number, daily_rate, status } = req.body;

    if (!brand || !model || !registration_number || daily_rate === undefined) {
      return res.status(400).json({ message: 'brand, model, registration_number and daily_rate are all required' });
    }

    if (daily_rate < 0) {
      return res.status(400).json({ message: 'daily_rate cannot be negative' });
    }

    const updated = await vehicleModel.updateVehicle(req.params.id, { brand, model, registration_number, daily_rate, status });

    if (!updated) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error: error.message });
  }
}

// DELETE /api/vehicles/:id
async function deleteVehicle(req, res) {
  try {
    const deleted = await vehicleModel.deleteVehicle(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
  }
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};