import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';

// Component to zoom to a selected feature
const ZoomToFeature = ({ feature }) => {
  const map = useMap();

  useEffect(() => {
    if (feature?.geometry) {
      const geojsonLayer = L.geoJSON(feature);
      const bounds = geojsonLayer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [feature, map]);

  return null;
};

const ParcelSearch = () => {
  const [parcels, setParcels] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const fetchParcels = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a plot ID.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const plotId = searchTerm.replace(/'/g, "''");
      const url = `http://localhost:8080/geoserver/Muranga_Municipality/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Muranga_Municipality:muranga_municipality&outputFormat=application/json&cql_filter=plot_id='${plotId}'`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch parcels');

      const data = await response.json();
      setParcels(data);
      setSelectedFeature(data.features?.[0] || null);
    } catch (err) {
      setError(err.message);
      setParcels(null);
      setSelectedFeature(null);
    } finally {
      setLoading(false);
    }
  };

  const onEachFeature = (feature, layer) => {
    const props = feature.properties;
    const content = `
      <h4>Parcel Details</h4>
      <ul>
        ${Object.entries(props)
          .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
          .join('')}
      </ul>
    `;
    layer.bindPopup(content);
  };

  const renderTable = () => {
    if (!parcels?.features?.length) return null;
    const headers = Object.keys(parcels.features[0].properties);

    return (
      <div className="search-results">
        <h2>Parcel Attributes</h2>
        <table>
          <thead>
            <tr>
              {headers.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parcels.features.map((feature) => (
              <tr key={feature.id}>
                {headers.map((key) => (
                  <td key={key}>{feature.properties[key] ?? 'N/A'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="parcel-search">
      <h1>Search Parcel by Plot ID</h1>
      <div className="search-controls">
        <input
          type="text"
          placeholder="Enter plot ID (e.g., 360)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchParcels} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="map-container">
        <MapContainer
          center={[-0.722, 37.158]}
          zoom={14}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {parcels?.features?.length > 0 && (
            <>
              <GeoJSON
                key={JSON.stringify(parcels)}
                data={parcels}
                onEachFeature={onEachFeature}
                style={{
                  color: 'blue',
                  weight: 2,
                  fillColor: 'yellow',
                  fillOpacity: 0.4,
                }}
              />
              <ZoomToFeature feature={selectedFeature} />
            </>
          )}
        </MapContainer>
      </div>
      {renderTable()}
      {parcels && parcels.features?.length === 0 && !loading && (
        <p>No parcel found with that plot ID.</p>
      )}
    </div>
  );
};

export default ParcelSearch;
