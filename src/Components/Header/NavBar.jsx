import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Profile } from "../Profile/Profile";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { width } from "@mui/system";

export const NavBar = ({
  onSearch,
  handleDestinationSearch,
  handleGetItinerary,
  setActiveComponent,
}) => {
  return (
    <>
      <div className="header">
        <div className="container">
          <a href="/">
            <h1 className="logo">XploreIN</h1>
          </a>
          <ul className="nav-menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="./HomePage#India">India</a>
            </li>
            <li>
              <a href="./Homepage#about">About</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
          <div className="lastitem">
            <ul>
              <li>
                <div
                  className="p-inputgroup"
                  style={{
                    width: "300px",
                    border: "solid 1px black",
                    borderRadius: "5px",
                  }}
                >
                  <InputText
                    placeholder="Search destination"
                    onChange={(e) => onSearch(e.target.value)}
                  />
                  <Button
                    icon="pi pi-search"
                    className="searchButton"
                    onClick={(e) => handleDestinationSearch(e)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "black",
                    }}
                  />
                </div>
              </li>
              <li>
                <Profile
                  handleGetItinerary={handleGetItinerary}
                  setActiveComponent={setActiveComponent}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
