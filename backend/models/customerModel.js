const db = require('../config/database');

// Get all customers
async function getAllCustomers() {
  const [rows] = await db.query('SELECT * FROM customers');
  return rows;
}

// Get a single customer by ID
async function getCustomerById(customerId) {
  const [rows] = await db.query(
    'SELECT * FROM customers WHERE customer_id = ?',
    [customerId]
  );
  return rows[0]; // undefined if no match
}

// Work out the next customer_id, e.g. CID-0001 -> CID-0002
async function getNextCustomerId() {
  const [rows] = await db.query(
    'SELECT customer_id FROM customers ORDER BY customer_id DESC LIMIT 1'
  );

  if (rows.length === 0) {
    return 'CID-0001';
  }

  const lastId = rows[0].customer_id;            // e.g. "CID-0007"
  const number = parseInt(lastId.split('-')[1], 10) + 1;
  const padded = String(number).padStart(4, '0');
  return `CID-${padded}`;
}

// Create a new customer
async function createCustomer(customerData) {
  const { name, email, phone, driving_license } = customerData;
  const customerId = await getNextCustomerId();

  await db.query(
    'INSERT INTO customers (customer_id, name, email, phone, driving_license) VALUES (?, ?, ?, ?, ?)',
    [customerId, name, email, phone, driving_license]
  );

  return { customer_id: customerId, name, email, phone, driving_license };
}

// Update an existing customer
async function updateCustomer(customerId, customerData) {
  const { name, email, phone, driving_license } = customerData;

  const [result] = await db.query(
    'UPDATE customers SET name = ?, email = ?, phone = ?, driving_license = ? WHERE customer_id = ?',
    [name, email, phone, driving_license, customerId]
  );

  return result.affectedRows > 0; // true if a row actually matched and updated
}

// Delete a customer
async function deleteCustomer(customerId) {
  const [result] = await db.query(
    'DELETE FROM customers WHERE customer_id = ?',
    [customerId]
  );

  return result.affectedRows > 0; // true if a row actually matched and was deleted
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};