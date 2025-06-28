import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ParcelSearch from './components/ParcelSearch';
import MapView from './components/MapView';
import LandRecords from './components/LandRecords';
import UserProfile from './components/UserProfile';
import Contact from './pages/Contact';
import ViewMore from './pages/ViewMore';
import Login from './auth/Login';
import Register from './auth/Register';
import './App.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <div className="app">
        {loggedInUser && <Navbar />}
        
        <main>
          <div className="page-container">
            <Routes>
              {!loggedInUser ? (
                <>
                  <Route path="/*" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Login setUser={setLoggedInUser} />} />
                  <Route path="/register" element={<Register setUser={setLoggedInUser} />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/parcel-search" element={<ParcelSearch />} />
                  <Route path="/map-view" element={<MapView />} />
                  <Route path="/land-records" element={<LandRecords />} />
                  <Route path="/user" element={<UserProfile user={loggedInUser} />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/view-more" element={<ViewMore />} />
                  <Route path="/login" element={<Navigate to="/" />} />
                  <Route path="/register" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          </div>
        </main>

        {loggedInUser && <Footer />}
      </div>
    </Router>
  );
}

export default App;
