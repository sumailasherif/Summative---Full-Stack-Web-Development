import { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to load dashboard stats.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your fleet, customers, and rentals</p>
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : message ? (
        <p className="message-error">{message.text}</p>
      ) : (
        <div className="dashboard-stats">
          <div className="stat-card">
            <h2>{stats.totalCustomers}</h2>
            <p>Total Customers</p>
          </div>
          <div className="stat-card">
            <h2>{stats.totalVehicles}</h2>
            <p>Total Vehicles</p>
          </div>
          <div className="stat-card">
            <h2>{stats.totalRentals}</h2>
            <p>Total Rentals</p>
          </div>
          <div className="stat-card">
            <h2>{stats.activeRentals}</h2>
            <p>Active Rentals</p>
          </div>
          <div className="stat-card">
            <h2>{stats.availableVehicles}</h2>
            <p>Available Vehicles</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
