import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <h2>Medical Supplies Within <b>Hours.</b></h2>

      <div className="row">
        {/* change a to link *imp */}
        <ul>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <a href="#" target={'blank'}>Privacy Policy</a>
          </li>
        </ul>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.289002960335!2d77.16610797519353!3d28.651064075654663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03451f582ddf%3A0x6940d146798f043b!2skamal%20medicos%20pharma!5e0!3m2!1sen!2sin!4v1681126552668!5m2!1sen!2sin"
            title="map"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div style={{ pointerEvents: "none" }} className="row">
        Kamal Medicos Pharma ©2023 - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
