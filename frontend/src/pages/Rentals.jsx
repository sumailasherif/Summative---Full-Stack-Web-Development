import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRentals, createRental, updateRental, deleteRental } from '../services/api';

function Rentals() {
  const [rentals, setRentals] = useState([]);
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
    loadRentals();
  }, []);

  async function loadRentals() {
    try {
      setLoading(true);
      const data = await getRentals();
      setRentals(data);
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

    if (!formData.customer_id.trim() || !formData.vehicle_id.trim() || !formData.start_date || !formData.end_date) {
      setMessage({ type: 'error', text: 'Customer ID, Vehicle ID, start date and end date are all required.' });
      return;
    }

    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      setMessage({ type: 'error', text: 'End date must be after start date.' });
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
      loadRentals();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Unable to save rental.' });
    }
  }

  function handleEdit(rental) {
    setEditingId(rental.rental_id);
    setFormData({
      customer_id: rental.customer_id,
      vehicle_id: rental.vehicle_id,
      start_date: rental.start_date ? rental.start_date.slice(0, 10) : '',
      end_date: rental.end_date ? rental.end_date.slice(0, 10) : '',
      status: rental.status,
    });
  }

  async function handleDelete(rentalId) {
    try {
      await deleteRental(rentalId);
      setMessage({ type: 'success', text: 'Rental deleted successfully.' });
      loadRentals();
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to delete rental.' });
    }
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
        <input type="text" name="customer_id" placeholder="Customer ID (e.g. CID-0001)" value={formData.customer_id} onChange={handleChange} />
        <input type="text" name="vehicle_id" placeholder="Vehicle ID (e.g. VID-0001)" value={formData.vehicle_id} onChange={handleChange} />
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} />
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="booked">Booked</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
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
              <th>Start</th>
              <th>End</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.rental_id}>
                <td>{rental.rental_id}</td>
                <td>{rental.customer_id}</td>
                <td>{rental.vehicle_id}</td>
                <td>{rental.start_date ? rental.start_date.slice(0, 10) : ''}</td>
                <td>{rental.end_date ? rental.end_date.slice(0, 10) : ''}</td>
                <td>{rental.total_price}</td>
                <td>{rental.status}</td>
                <td>
                  <Link to={`/rentals/${rental.rental_id}`}>View</Link>{' '}
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