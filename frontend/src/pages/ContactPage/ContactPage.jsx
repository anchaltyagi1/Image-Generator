import React from "react";
import "./ContactPage.css";
import Navbar from "../Navbar/Navbar";

const ContactPage = () => {
  return (
    <div>
      <Navbar page="contact" />
      <div className="contact-content">
        <h2>Contact Us</h2>
        <p>
          If you have any questions, suggestions, or feedback, feel free to
          contact us.
        </p>
        <div className="contact-details">
          <p>Email: sumitrawat@gmail.com</p>
          <p>Phone: +1234567890</p>
          <p>Address: 123 Main-Road,Ghaziabad,India</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
