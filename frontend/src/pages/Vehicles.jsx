import { useState, useEffect } from 'react';
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '../services/api';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    registration_number: '',
    daily_rate: '',
    status: 'available',
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles() {
    try {
      setLoading(true);
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to load vehicles.' });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function resetForm() {
    setFormData({ brand: '', model: '', registration_number: '', daily_rate: '', status: 'available' });
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.brand.trim() || !formData.model.trim() || !formData.registration_number.trim()) {
      setMessage({ type: 'error', text: 'Brand, model and registration number cannot be empty.' });
      return;
    }

    if (Number(formData.daily_rate) < 0) {
      setMessage({ type: 'error', text: 'Daily rate cannot be negative.' });
      return;
    }

    try {
      const payload = { ...formData, daily_rate: Number(formData.daily_rate) };

      if (editingId) {
        await updateVehicle(editingId, payload);
        setMessage({ type: 'success', text: 'Vehicle updated successfully.' });
      } else {
        await createVehicle(payload);
        setMessage({ type: 'success', text: 'Vehicle added successfully.' });
      }
      resetForm();
      loadVehicles();
    } catch (error) {
      setMessage({ type: 'error', text: editingId ? 'Unable to update vehicle.' : 'Unable to add vehicle.' });
    }
  }

  function handleEdit(vehicle) {
    setEditingId(vehicle.vehicle_id);
    setFormData({
      brand: vehicle.brand,
      model: vehicle.model,
      registration_number: vehicle.registration_number,
      daily_rate: vehicle.daily_rate,
      status: vehicle.status,
    });
  }

  async function handleDelete(vehicleId) {
    try {
      await deleteVehicle(vehicleId);
      setMessage({ type: 'success', text: 'Vehicle deleted successfully.' });
      loadVehicles();
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to delete vehicle.' });
    }
  }

  return (
    <div className="vehicles-page">
      <h1>Vehicles</h1>

      {message && (
        <p className={message.type === 'success' ? 'message-success' : 'message-error'}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} />
        <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleChange} />
        <input type="text" name="registration_number" placeholder="Registration Number" value={formData.registration_number} onChange={handleChange} />
        <input type="number" name="daily_rate" placeholder="Daily Rate" value={formData.daily_rate} onChange={handleChange} />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <button type="submit">{editingId ? 'Update Vehicle' : 'Add Vehicle'}</button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading vehicles...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Registration</th>
              <th>Daily Rate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.vehicle_id}>
                <td>{vehicle.vehicle_id}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.registration_number}</td>
                <td>{vehicle.daily_rate}</td>
                <td>{vehicle.status}</td>
                <td>
                  <button onClick={() => handleEdit(vehicle)}>Edit</button>
                  <button onClick={() => handleDelete(vehicle.vehicle_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Vehicles;