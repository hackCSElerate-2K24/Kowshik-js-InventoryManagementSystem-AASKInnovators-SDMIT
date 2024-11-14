// src/components/Body.jsx

import React from 'react';
import './Body.css';

const Body = () => {
  return (
    <div className="body-container">
      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>
          Welcome to our website! We are a team dedicated to providing high-quality services and products to our customers. Our mission is to make the world a better place through innovation and creativity.
        </p>
        <div className="image-container">
          {/* Added image here */}
          <img
            src="https://media.istockphoto.com/id/1484852942/photo/smart-warehouse-inventory-management-system-concept.jpg?s=612x612&w=0&k=20&c=q5hzpG2i4A7iVLT7sseXdKIsVxClkLJrUlLsZJNIGMs="
            alt="About Us"
            className="about-us-image"
          />
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-us">
        <h2>Contact Us</h2>
        <p>
          We would love to hear from you! Whether you have a question, feedback, or want to collaborate, feel free to reach out to us.
        </p>
        <ul>
          <li>Email: <a href="mailto:info@company.com">AASKInnovators@gmail.com</a></li>
          <li>Phone: +9141047589</li>
          <li>Address: 1234 Main Street, Bengaluru, Karnataka</li>
        </ul>
      </section>
    </div>
  );
};

export default Body;
