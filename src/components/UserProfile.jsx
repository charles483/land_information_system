import React, { useState, useEffect } from 'react';
import '../App.css';

const UserProfile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optional: You could persist this change to a server here
    setEditing(false);
  };

  if (!user) {
    return (
      <div className="user-profile">
        <h1>User Profile</h1>
        <p>Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>

      {editing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Member Since:</label>
            <input
              type="text"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">Save</button>
            <button
              type="button"
              className="btn cancel"
              onClick={() => {
                setFormData(user);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <div className="profile-detail">
            <span className="label">Name:</span>
            <span className="value">{formData.name}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Email:</span>
            <span className="value">{formData.email}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Role:</span>
            <span className="value">{formData.role}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Member Since:</span>
            <span className="value">{formData.joinDate}</span>
          </div>

          <button
            onClick={() => {
              setEditing(true);
            }}
            className="btn"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
