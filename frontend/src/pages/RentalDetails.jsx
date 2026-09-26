import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRentalById, getCustomerById, getVehicleById } from '../services/api';

function RentalDetails() {
  const { id } = useParams();
  const [rental, setRental] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDetails();
  }, [id]);

  async function loadDetails() {
    try {
      setLoading(true);
      setError(null);
      const rentalData = await getRentalById(id);
      setRental(rentalData);

      const [customerData, vehicleData] = await Promise.all([
        getCustomerById(rentalData.customer_id),
        getVehicleById(rentalData.vehicle_id),
      ]);
      setCustomer(customerData);
      setVehicle(vehicleData);
    } catch (err) {
      setError('Unable to load rental details.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading rental details...</p>;
  }

  if (error) {
    return (
      <div className="rental-details-page">
        <p className="message-error">{error}</p>
        <Link to="/rentals">Back to Rentals</Link>
      </div>
    );
  }

  return (
    <div className="rental-details-page">
      <div className="page-header">
        <h1>Rental #{rental.rental_id}</h1>
      </div>

      <div className="card">
        <h2>Rental Info</h2>
        <p>Start date: {rental.start_date ? rental.start_date.slice(0, 10) : ''}</p>
        <p>End date: {rental.end_date ? rental.end_date.slice(0, 10) : ''}</p>
        <p>Total price: {rental.total_price}</p>
        <p>Status: <span className={`badge badge-${rental.status}`}>{rental.status}</span></p>
      </div>

      <div className="card">
        <h2>Customer</h2>
        {customer ? (
          <>
            <p>{customer.name} ({customer.customer_id})</p>
            <p>{customer.email} &middot; {customer.phone}</p>
          </>
        ) : (
          <p>Customer details unavailable.</p>
        )}
      </div>

      <div className="card">
        <h2>Vehicle</h2>
        {vehicle ? (
          <>
            <p>{vehicle.brand} {vehicle.model} ({vehicle.vehicle_id})</p>
            <p>Registration: {vehicle.registration_number} &middot; Daily rate: {vehicle.daily_rate}</p>
          </>
        ) : (
          <p>Vehicle details unavailable.</p>
        )}
      </div>

      <p><Link to="/rentals">Back to Rentals</Link></p>
    </div>
  );
}

export default RentalDetails;
