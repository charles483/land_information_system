import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ParcelSearch from './components/ParcelSearch';
import MapView from './components/MapView';
import LandRecords from './components/LandRecords';
import UserProfile from './components/UserProfile';
import Contact from './pages/Contact';
import ViewMore from './pages/ViewMore';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <main>
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/parcel-search" element={<ParcelSearch />} />
              <Route path="/map-view" element={<MapView />} />
              <Route path="/land-records" element={<LandRecords />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/view-more" element={<ViewMore />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
