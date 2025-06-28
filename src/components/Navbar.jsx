import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo.png'; // ✅ Ensure this path is correct

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="logo-link">
            <img src={logo} alt="TerraGrid Logo" className="logo-img" />
            LANInfoSys
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/parcel-search">Parcel Search</Link>
          <Link to="/map-view">Map View</Link>
          <Link to="/land-records">Land Records</Link>
          <Link to="/user">User</Link>
        </div>
        <div className="navbar-actions">
          <Link to="/contact" className="btn">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
