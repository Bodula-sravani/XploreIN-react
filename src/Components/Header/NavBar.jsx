import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { SideBar } from "../SideBar/SideBar";
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
              <a href="/">Rural</a>
            </li>
            <li>
              <a href="./Homepage#about">About</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
            {/* {!isLoggedIn && (
              <li>
                <div className="card flex justify-content-center">
                  <a href="#" onClick={handleClick}>
                    Login
                  </a>
                  <Dialog
                    header="Login"
                    visible={visible}
                    position="center"
                    style={{ width: "50vw" }}
                    onHide={() => {
                      setVisible(false);
                      setEmail("");
                      setPassword("");
                      setMessage("");
                      setIsLoggedIn(localStorage.getItem("isLoggedIn")); // Reset the message when the dialog is closed
                    }}
                    draggable={false}
                    resizable={false}
                    footer={footerContent}
                  >
                    {message && <p className="message">{message}</p>}
                    <form
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <label id="email">Email</label>
                      <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label id="password">Password</label>
                      <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </form>
                  </Dialog>
                </div>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <a href="/">Signup</a>
              </li>
            )} */}
          </ul>
          {/* <form className="Search">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => onSearch(e.target.value)}
            />
            <button className="btn" onClick={(e) => handleDestinationSearch(e)}>
              Search
            </button>
          </form> */}
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
                <SideBar
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
