import React from "react";
import "./Footer.css";
import { Button } from "primereact/button";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>About XploreIN</h4>
            <p>
              XploreIN is a travel website dedicated to helping travelers
              discover new destinations and plan their perfect trips.
            </p>
          </div>
          <div className="footer-column">
            <h4>Contact Info</h4>
            <p>
              <strong>Email:</strong> info@xplorein.com
            </p>
            <p>
              <strong>Phone:</strong> 6302790594
            </p>
            <p>
              <strong>Address:</strong> 123 Main Street, Banglore, India
            </p>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <div className="social-media">
              <Button
                icon="pi pi-facebook"
                className="p-button-rounded p-button-text p-button-plain"
                onClick={() => {}}
              />
              <Button
                icon="pi pi-twitter"
                className="p-button-rounded p-button-text p-button-plain"
                onClick={() => {}}
              />
              <Button
                icon="pi pi-instagram"
                className="p-button-rounded p-button-text p-button-plain"
                onClick={() => {
                  /* Handle Instagram click */
                }}
              />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} XploreIN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
