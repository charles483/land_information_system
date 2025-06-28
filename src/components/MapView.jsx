import React, { useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayersControl,
  useMapEvents,
  Popup,
  Marker
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';

const GeoServerWMSURL = "http://localhost:8080/geoserver/Muranga_Municipality/wms";
const layerName = "Muranga_Municipality:muranga_municipality";

const MapClickHandler = ({ setPopupData }) => {
  useMapEvents({
    click: async (e) => {
      const map = e.target;
      const { lat, lng } = e.latlng;
      const size = map.getSize();

      const params = {
        service: "WMS",
        version: "1.1.0",
        request: "GetFeatureInfo",
        layers: layerName,
        query_layers: layerName,
        info_format: "application/json",
        feature_count: 1,
        x: Math.floor(e.containerPoint.x),
        y: Math.floor(e.containerPoint.y),
        srs: "EPSG:4326",
        width: size.x,
        height: size.y,
        bbox: map.getBounds().toBBoxString()
      };

      const url = `${GeoServerWMSURL}?${new URLSearchParams(params).toString()}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.features.length > 0) {
          const props = data.features[0].properties;
          setPopupData({
            lat,
            lng,
            content: Object.entries(props).map(([key, val]) => `<strong>${key}:</strong> ${val}`).join("<br/>")
          });
        } else {
          setPopupData(null);
        }
      } catch (err) {
        console.error("Error fetching parcel info:", err);
        setPopupData(null);
      }
    }
  });

  return null;
};

const MapView = () => {
  const [popupData, setPopupData] = React.useState(null);

  return (
    <div className="map-view">
      <h1>Map View</h1>
      <div className="map-container">
        <MapContainer
          center={[-0.723, 37.157]}
          zoom={16}
          style={{ height: '100%', width: '100%' }}
        >
          <MapClickHandler setPopupData={setPopupData} />

          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Satellite">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles &copy; Esri &mdash; Source: Esri, USGS, etc."
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Terrain">
              <TileLayer
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                attribution="Map data: &copy; OpenStreetMap contributors, SRTM"
              />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay checked name="Parcels (WMS)">
              <WMSTileLayer
                url={GeoServerWMSURL}
                layers={layerName}
                format="image/png"
                transparent={true}
                version="1.1.0"
                attribution="Muranga Municipality GeoServer"
              />
            </LayersControl.Overlay>
          </LayersControl>

          {/* ✅ Show popup if parcel was clicked */}
          {popupData && (
            <Popup position={[popupData.lat, popupData.lng]}>
              <div dangerouslySetInnerHTML={{ __html: popupData.content }} />
            </Popup>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
