import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <span className="nav-brand">Vehicle Rental</span>
      <div className="nav-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/customers">Customers</NavLink>
        <NavLink to="/vehicles">Vehicles</NavLink>
        <NavLink to="/rentals">Rentals</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;