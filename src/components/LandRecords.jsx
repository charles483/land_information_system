import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import '../App.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const generateColors = (num) => {
  const palette = [
    '#1abc9c', '#3498db', '#9b59b6', '#e67e22',
    '#f39c12', '#2ecc71', '#c0392b', '#34495e',
    '#7f8c8d', '#8e44ad', '#16a085', '#2980b9',
    '#d35400', '#e74c3c', '#27ae60', '#2c3e50'
  ];
  return palette.slice(0, num);
};

const LandRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/geoserver/Muranga_Municipality/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Muranga_Municipality:muranga_municipality&outputFormat=application/json'
        );

        if (!response.ok) throw new Error('Failed to fetch GeoServer data');

        const geojson = await response.json();

        const features = geojson.features.map((feature, index) => ({
          id: feature.id || `record-${index + 1}`,
          plotId: feature.properties.plot_id,
          plotName: feature.properties.plot_name,
          landUse: feature.properties.land_use,
          plotArea: feature.properties.plot_area_,
          tenure: feature.properties.tenure,
          status: feature.properties.status,
          ownership: feature.properties.ownership,
          comments: feature.properties.comments,
          areaHa: feature.properties.Area_ha,
        }));

        setRecords(features);
      } catch (err) {
        console.error(err);
        setError('Failed to load land records');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const landUseCounts = {};
  const landUseAreas = {};

  records.forEach((record) => {
    const lu = record.landUse || 'Unknown';
    landUseCounts[lu] = (landUseCounts[lu] || 0) + 1;
    landUseAreas[lu] = (landUseAreas[lu] || 0) + (parseFloat(record.areaHa) || 0);
  });

  const labels = Object.keys(landUseCounts);
  const colors = generateColors(labels.length);

  const pieData = {
    labels,
    datasets: [
      {
        label: 'Parcel Count',
        data: Object.values(landUseCounts),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: Object.keys(landUseAreas),
    datasets: [
      {
        label: 'Total Area (ha)',
        data: Object.values(landUseAreas),
        backgroundColor: colors,
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="land-records">
      <h1>Land Parcel Records</h1>

      {loading ? (
        <p>Loading records...</p>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          {/* Charts First */}
          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr', marginTop: '2rem' }}>
            <div style={{ background: '#fff', padding: '1rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ textAlign: 'center' }}>Parcels by Land Use</h3>
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right',
                      align: 'center',
                    },
                  },
                }}
              />
            </div>

            <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ textAlign: 'center' }}>Total Area by Land Use (ha)</h3>
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: { display: true, text: 'Area (ha)' }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Table Below */}
          <div className="records-table" style={{ marginTop: '3rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Plot ID</th>
                  <th>Plot Name</th>
                  <th>Land Use</th>
                  <th>Plot Area (m²)</th>
                  <th>Area (ha)</th>
                  <th>Tenure</th>
                  <th>Status</th>
                  <th>Ownership</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.plotId}</td>
                    <td>{record.plotName}</td>
                    <td>{record.landUse}</td>
                    <td>{record.plotArea}</td>
                    <td>{record.areaHa}</td>
                    <td>{record.tenure}</td>
                    <td>
                      <span className={`status-badge ${record.status?.toLowerCase() || 'unknown'}`}>
                        {record.status || 'N/A'}
                      </span>
                    </td>
                    <td>{record.ownership}</td>
                    <td>{record.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default LandRecords;
