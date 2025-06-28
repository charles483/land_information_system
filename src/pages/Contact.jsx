// Contact.jsx - boilerplate
import React, { useState } from 'react';
import '../App.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset submission status after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Have questions about LANInfoSys or need assistance? 
            Fill out the form and our team will get back to you as soon as possible.
          </p>
          
          <div className="contact-details">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> info@LANInfoSys.com</p>
            <p><strong>Phone:</strong> +254743930565</p>
            <p><strong>Address:</strong> Nyeri, Kenya</p>
          </div>
        </div>
        
        <div className="contact-form">
          {submitted ? (
            <div className="success-message">
              <h3>Thank you for contacting us!</h3>
              <p>We have received your message and will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;