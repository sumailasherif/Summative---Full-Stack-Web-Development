const BASE_URL = 'http://localhost:3000/api';

// ---------- Customers ----------

export async function getCustomers() {
  const response = await fetch(`${BASE_URL}/customers`);
  if (!response.ok) {
    throw new Error('Failed to fetch customers');
  }
  return response.json();
}

export async function getCustomerById(id) {
  const response = await fetch(`${BASE_URL}/customers/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch customer');
  }
  return response.json();
}

export async function createCustomer(customerData) {
  const response = await fetch(`${BASE_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create customer');
  }
  return response.json();
}

export async function updateCustomer(id, customerData) {
  const response = await fetch(`${BASE_URL}/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update customer');
  }
  return response.json();
}

export async function deleteCustomer(id) {
  const response = await fetch(`${BASE_URL}/customers/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete customer');
  }
  return response.json();
}

// ---------- Vehicles ----------

export async function getVehicles() {
  const response = await fetch(`${BASE_URL}/vehicles`);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }
  return response.json();
}

export async function getVehicleById(id) {
  const response = await fetch(`${BASE_URL}/vehicles/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle');
  }
  return response.json();
}

export async function createVehicle(vehicleData) {
  const response = await fetch(`${BASE_URL}/vehicles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehicleData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create vehicle');
  }
  return response.json();
}

export async function updateVehicle(id, vehicleData) {
  const response = await fetch(`${BASE_URL}/vehicles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehicleData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update vehicle');
  }
  return response.json();
}

export async function deleteVehicle(id) {
  const response = await fetch(`${BASE_URL}/vehicles/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete vehicle');
  }
  return response.json();
}
// ---------- Rentals ----------

export async function getRentals() {
  const response = await fetch(`${BASE_URL}/rentals`);
  if (!response.ok) {
    throw new Error('Failed to fetch rentals');
  }
  return response.json();
}

export async function getRentalById(id) {
  const response = await fetch(`${BASE_URL}/rentals/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch rental');
  }
  return response.json();
}

export async function createRental(rentalData) {
  const response = await fetch(`${BASE_URL}/rentals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rentalData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create rental');
  }
  return response.json();
}

export async function updateRental(id, rentalData) {
  const response = await fetch(`${BASE_URL}/rentals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rentalData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update rental');
  }
  return response.json();
}

export async function deleteRental(id) {
  const response = await fetch(`${BASE_URL}/rentals/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete rental');
  }
  return response.json();
}

// ---------- Dashboard ----------

export async function getDashboardStats() {
  const response = await fetch(`${BASE_URL}/dashboard/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard stats');
  }
  return response.json();
}