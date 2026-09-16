import { useState, useEffect } from 'react';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/api';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    driving_license: '',
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to load customers.' });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function resetForm() {
    setFormData({ name: '', email: '', phone: '', driving_license: '' });
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage({ type: 'error', text: 'Name and email cannot be empty.' });
      return;
    }

    try {
      if (editingId) {
        await updateCustomer(editingId, formData);
        setMessage({ type: 'success', text: 'Customer updated successfully.' });
      } else {
        await createCustomer(formData);
        setMessage({ type: 'success', text: 'Customer added successfully.' });
      }
      resetForm();
      loadCustomers();
    } catch (error) {
      setMessage({ type: 'error', text: editingId ? 'Unable to update customer.' : 'Unable to add customer.' });
    }
  }

  function handleEdit(customer) {
    setEditingId(customer.customer_id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      driving_license: customer.driving_license,
    });
  }

  async function handleDelete(customerId) {
    try {
      await deleteCustomer(customerId);
      setMessage({ type: 'success', text: 'Customer deleted successfully.' });
      loadCustomers();
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to delete customer.' });
    }
  }

  return (
    <div className="customers-page">
      <h1>Customers</h1>

      {message && (
        <p className={message.type === 'success' ? 'message-success' : 'message-error'}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input type="text" name="driving_license" placeholder="Driving License" value={formData.driving_license} onChange={handleChange} />
        <button type="submit">{editingId ? 'Update Customer' : 'Add Customer'}</button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading customers...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Driving License</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id}>
                <td>{customer.customer_id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.driving_license}</td>
                <td>
                  <button onClick={() => handleEdit(customer)}>Edit</button>
                  <button onClick={() => handleDelete(customer.customer_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Customers;