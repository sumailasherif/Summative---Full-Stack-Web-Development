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
import { useState, useEffect } from 'react';
import {
  getRentals,
  createRental,
  updateRental,
  deleteRental,
  getCustomers,
  getVehicles,
} from '../services/api';

function Rentals() {
  const [rentals, setRentals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    customer_id: '',
    vehicle_id: '',
    start_date: '',
    end_date: '',
    status: 'booked',
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [rentalsData, customersData, vehiclesData] = await Promise.all([
        getRentals(),
        getCustomers(),
        getVehicles(),
      ]);
      setRentals(rentalsData);
      setCustomers(customersData);
      setVehicles(vehiclesData);
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to load rentals.' });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function resetForm() {
    setFormData({ customer_id: '', vehicle_id: '', start_date: '', end_date: '', status: 'booked' });
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.customer_id || !formData.vehicle_id || !formData.start_date || !formData.end_date) {
      setMessage({ type: 'error', text: 'Customer, vehicle, start date and end date cannot be empty.' });
      return;
    }

    try {
      if (editingId) {
        await updateRental(editingId, formData);
        setMessage({ type: 'success', text: 'Rental updated successfully.' });
      } else {
        await createRental(formData);
        setMessage({ type: 'success', text: 'Rental added successfully.' });
      }
      resetForm();
      loadData();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || (editingId ? 'Unable to update rental.' : 'Unable to add rental.'),
      });
    }
  }

  function handleEdit(rental) {
    setEditingId(rental.rental_id);
    setFormData({
      customer_id: rental.customer_id,
      vehicle_id: rental.vehicle_id,
      start_date: rental.start_date?.slice(0, 10) || '',
      end_date: rental.end_date?.slice(0, 10) || '',
      status: rental.status,
    });
  }

  async function handleDelete(rentalId) {
    try {
      await deleteRental(rentalId);
      setMessage({ type: 'success', text: 'Rental deleted successfully.' });
      loadData();
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to delete rental.' });
    }
  }

  function getCustomerName(id) {
    const customer = customers.find((c) => c.customer_id === id);
    return customer ? customer.name : id;
  }

  function getVehicleLabel(id) {
    const vehicle = vehicles.find((v) => v.vehicle_id === id);
    return vehicle ? `${vehicle.brand} ${vehicle.model}` : id;
  }

  return (
    <div className="rentals-page">
      <h1>Rentals</h1>

      {message && (
        <p className={message.type === 'success' ? 'message-success' : 'message-error'}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <select name="customer_id" value={formData.customer_id} onChange={handleChange}>
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.customer_id} value={customer.customer_id}>
              {customer.name} ({customer.customer_id})
            </option>
          ))}
        </select>

        <select name="vehicle_id" value={formData.vehicle_id} onChange={handleChange}>
          <option value="">Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
              {vehicle.brand} {vehicle.model} ({vehicle.vehicle_id})
            </option>
          ))}
        </select>

        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} />
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="booked">Booked</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button type="submit">{editingId ? 'Update Rental' : 'Add Rental'}</button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading rentals...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.rental_id}>
                <td>{rental.rental_id}</td>
                <td>{getCustomerName(rental.customer_id)}</td>
                <td>{getVehicleLabel(rental.vehicle_id)}</td>
                <td>{rental.start_date?.slice(0, 10)}</td>
                <td>{rental.end_date?.slice(0, 10)}</td>
                <td>${Number(rental.total_price).toFixed(2)}</td>
                <td>{rental.status}</td>
                <td>
                  <button onClick={() => handleEdit(rental)}>Edit</button>
                  <button onClick={() => handleDelete(rental.rental_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Rentals;

// ---------- Dashboard ----------

export async function getDashboardStats() {
  const response = await fetch(`${BASE_URL}/dashboard/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard stats');
  }
  return response.json();
}