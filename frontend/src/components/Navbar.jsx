import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/customers">Customers</Link>
      <Link to="/vehicles">Vehicles</Link>
      <Link to="/rentals">Rentals</Link>
    </nav>
  );
}

export default Navbar;