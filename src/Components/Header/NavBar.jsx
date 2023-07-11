import React, { useState, useRef } from "react";
import { Profile } from "../Profile/Profile";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./NavBar.css";

export const NavBar = ({ onSearch, handleDestinationSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="logodiv">
            <a href="/">
              <h1 className="logo">XploreIN</h1>
            </a>
          </div>
          <div
            className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
            onClick={handleMenuToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          {isMenuOpen && (
            <div className="dropdownLeft">
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link to="/">
                    <Button
                      label="Home"
                      icon="pi pi-home"
                      className="listButtons"
                    ></Button>
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/ruraltourism">
                    <Button
                      label="India"
                      icon="pi pi-compass"
                      className="listButtons"
                    ></Button>
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/reviews">
                    <Button
                      label="Reviews"
                      icon="pi pi-comments"
                      className="listButtons"
                    ></Button>
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/#Footer">
                    <Button
                      label="Contact"
                      icon="pi pi-phone"
                      className="listButtons"
                    ></Button>
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <ul className={"nav-menu"}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/ruraltourism">India</a>
            </li>
            <li>
              <a href="/reviews">Reviews</a>
            </li>
            <li>
              <a href="/#Footer">Contact</a>
            </li>
          </ul>
          <div className="lastitem">
            <ul>
              <li>
                <div className="p-inputgroup inputGroup">
                  <InputText
                    placeholder="Search destination"
                    onChange={(e) => onSearch(e.target.value)}
                    className="searchInput"
                  />
                  <Button
                    icon="pi pi-search"
                    className="searchButton"
                    onClick={(e) => handleDestinationSearch(e)}
                  />
                </div>
              </li>
              <li>
                <Profile />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
