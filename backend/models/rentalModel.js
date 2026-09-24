const db = require('../config/database');

// This allows us to get all rentals
async function getAllRentals() {
  const [rows] = await db.query('SELECT * FROM rentals');
  return rows;
}

// This allows us to get a single rental by ID
async function getRentalById(rentalId) {
  const [rows] = await db.query(
    'SELECT * FROM rentals WHERE rental_id = ?',
    [rentalId]
  );
  return rows[0]; // undefined if there is no match
}


// this creates a new rental record in the database, and returns the new rental object with its new rental_id
async function createRental(rentalData) {
  const { customer_id, vehicle_id, start_date, end_date, total_price, status } = rentalData;

  const [result] = await db.query(
    'INSERT INTO rentals (customer_id, vehicle_id, start_date, end_date, total_price, status) VALUES (?, ?, ?, ?, ?, ?)',
    [customer_id, vehicle_id, start_date, end_date, total_price, status]
  );

  // rental_id is auto-increment, so MySQL hands the new ID back as result.insertId
  return { rental_id: result.insertId, customer_id, vehicle_id, start_date, end_date, total_price, status };
}

//This helps to update an existing rental record
async function updateRental(rentalId, rentalData) {
  const { customer_id, vehicle_id, start_date, end_date, total_price, status } = rentalData;

  const [result] = await db.query(
    'UPDATE rentals SET customer_id = ?, vehicle_id = ?, start_date = ?, end_date = ?, total_price = ?, status = ? WHERE rental_id = ?',
    [customer_id, vehicle_id, start_date, end_date, total_price, status, rentalId]
  );

  return result.affectedRows > 0;
}