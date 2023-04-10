import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <h2>Medical Supplies Within <b>Hours.</b></h2>

      <div className="row">
        {/* change a to link *imp */}
        <ul>
          <li>
            <a href="#" target={'blank'}>Contact us</a>
          </li>
          <li>
            <a href="#" target={'blank'}>Privacy Policy</a>
          </li>
        </ul>
      </div>

      <div style={{ pointerEvents: "none" }} className="row">
        Kamal Medicos Pharma ©2023 - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
