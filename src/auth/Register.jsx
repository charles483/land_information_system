import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password && formData.name) {
      setUser({
        name: formData.name,
        email: formData.email,
        role: 'Standard User',
        joinDate: new Date().toISOString().split('T')[0]
      });
      navigate('/');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '4rem auto' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            required 
          />
        </div>

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
          <button type="submit" className="btn">Register</button>
          <Link to="/login" className="btn" style={{ backgroundColor: '#555' }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
