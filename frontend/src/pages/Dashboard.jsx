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