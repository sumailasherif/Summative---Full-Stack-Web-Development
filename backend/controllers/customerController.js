const customerModel = require('../models/customerModel');

// GET /api/customers
async function getAllCustomers(req, res) {
  try {
    const customers = await customerModel.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving customers', error: error.message });
  }
}

// GET /api/customers/:id
async function getCustomerById(req, res) {
  try {
    const customer = await customerModel.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving customer', error: error.message });
  }
}

// POST /api/customers
async function createCustomer(req, res) {
  try {
    const { name, email, phone, driving_license } = req.body;

    if (!name || !email || !phone || !driving_license) {
      return res.status(400).json({ message: 'name, email, phone and driving_license are all required' });
    }

    const newCustomer = await customerModel.createCustomer({ name, email, phone, driving_license });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error: error.message });
  }
}

// PUT /api/customers/:id
async function updateCustomer(req, res) {
  try {
    const { name, email, phone, driving_license } = req.body;

    if (!name || !email || !phone || !driving_license) {
      return res.status(400).json({ message: 'name, email, phone and driving_license are all required' });
    }

    const updated = await customerModel.updateCustomer(req.params.id, { name, email, phone, driving_license });

    if (!updated) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
}

// DELETE /api/customers/:id
async function deleteCustomer(req, res) {
  try {
    const deleted = await customerModel.deleteCustomer(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};