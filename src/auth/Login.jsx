import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple static login check (replace with real backend later)
    if (formData.email && formData.password) {
      setUser({
        name: 'Venance User',
        email: formData.email,
        role: 'Standard User',
        joinDate: '2023-01-15'
      });
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '4rem auto' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            required 
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn">Login</button>
          <Link to="/register" className="btn" style={{ backgroundColor: '#555' }}>
            Register
          </Link>
        </div>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <a href="#" style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
