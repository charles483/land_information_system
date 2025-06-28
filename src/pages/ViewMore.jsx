// ViewMore.jsx - boilerplate
import React from 'react';
import '../App.css';

const ViewMore = () => {
  return (
    <div className="view-more">
      <h1>About LANInfoSys</h1>
      
      <div className="content-section">
        <h2>Our Mission</h2>
        <p>
          The Land LANInfoSys is designed to modernize land management 
          through technology, providing transparent access to land records and 
          facilitating efficient land administration processes.
        </p>
      </div>
      
      <div className="content-section">
        <h2>Key Features</h2>
        <ul className="feature-list">
          <li>Comprehensive parcel search functionality</li>
          <li>Interactive mapping with multiple base layers</li>
          <li>Detailed land records and ownership information</li>
          <li>User-friendly interface for all stakeholders</li>
          <li>Secure access to sensitive data</li>
        </ul>
      </div>
      
      <div className="content-section">
        <h2>Technology Stack</h2>
        <div className="tech-stack">
          <div className="tech-item">
            <h3>Frontend</h3>
            <p>React.js, Leaflet.js, CSS3</p>
          </div>
          <div className="tech-item">
            <h3>Backend</h3>
            <p>GeoServer, PostGIS</p>
          </div>
          <div className="tech-item">
            <h3>Database</h3>
            <p>PostgreSQL with spatial extensions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMore;