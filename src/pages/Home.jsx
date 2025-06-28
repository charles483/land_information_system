import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Empowering Smarter Land Management Through Technology</h1>
        <p>
          The Land Information System (LIS) is a modern, interactive platform designed to help you access, 
          manage, and visualize land-related data with ease. Whether you're a landowner, planner, 
          researcher, or policymaker, our tool provides the insights you need to make informed decisions.
        </p>
      </div>
      
      <div className="features">
        <div className="card">
          <h2>Parcel Search</h2>
          <p>Quickly find land parcels using our advanced search tools.</p>
        </div>
        <div className="card">
          <h2>Interactive Maps</h2>
          <p>Visualize land data with our powerful mapping interface.</p>
        </div>
        <div className="card">
          <h2>Land Records</h2>
          <p>Access comprehensive land records and ownership information.</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/view-more" className="btn">View More</Link>
      </div>
    </div>
  );
};

export default Home;
