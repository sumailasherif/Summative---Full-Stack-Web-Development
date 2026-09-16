const db = require('../config/database');

// Get all vehicles
async function getAllVehicles() {
  const [rows] = await db.query('SELECT * FROM vehicles');
  return rows;
}

// Get a single vehicle by ID
async function getVehicleById(vehicleId) {
  const [rows] = await db.query(
    'SELECT * FROM vehicles WHERE vehicle_id = ?',
    [vehicleId]
  );
  return rows[0]; // undefined if no match
}

// Work out the next vehicle_id, e.g. VID-0001 -> VID-0002
async function getNextVehicleId() {
  const [rows] = await db.query(
    'SELECT vehicle_id FROM vehicles ORDER BY vehicle_id DESC LIMIT 1'
  );

  if (rows.length === 0) {
    return 'VID-0001';
  }

  const lastId = rows[0].vehicle_id;             // e.g. "VID-0005"
  const number = parseInt(lastId.split('-')[1], 10) + 1;
  const padded = String(number).padStart(4, '0');
  return `VID-${padded}`;
}

// Create a new vehicle
async function createVehicle(vehicleData) {
  const { brand, model, registration_number, daily_rate, status } = vehicleData;
  const vehicleId = await getNextVehicleId();

  await db.query(
    'INSERT INTO vehicles (vehicle_id, brand, model, registration_number, daily_rate, status) VALUES (?, ?, ?, ?, ?, ?)',
    [vehicleId, brand, model, registration_number, daily_rate, status || 'available']
  );

  return { vehicle_id: vehicleId, brand, model, registration_number, daily_rate, status: status || 'available' };
}

// Update an existing vehicle
async function updateVehicle(vehicleId, vehicleData) {
  const { brand, model, registration_number, daily_rate, status } = vehicleData;

  const [result] = await db.query(
    'UPDATE vehicles SET brand = ?, model = ?, registration_number = ?, daily_rate = ?, status = ? WHERE vehicle_id = ?',
    [brand, model, registration_number, daily_rate, status, vehicleId]
  );

  return result.affectedRows > 0;
}

// Delete a vehicle
async function deleteVehicle(vehicleId) {
  const [result] = await db.query(
    'DELETE FROM vehicles WHERE vehicle_id = ?',
    [vehicleId]
  );

  return result.affectedRows > 0;
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};