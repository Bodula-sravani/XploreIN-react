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
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );
  const handleLogin = async (e) => {
    const url = "https://localhost:7142/api/auth/login";

    const loginModel = {
      email,
      password,
    };

    try {
      // Send a POST request to the API
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginModel),
      });

      const data = await response.json();
      console.log(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", true);
      setMessage("Login successful!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Login failed. Please try again." + error);
    }
  };

  const handleClick = () => {
    setVisible(true);
  };

  const handleLogout = async () => {
    const url = "https://localhost:7142/api/auth/logout";

    try {
      // Send a POST request to the API
      const response = await fetch(url, {
        method: "POST",
      });

      // Clear the token and logged-in status from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setActiveComponent("HomePage");
      // Display a message indicating successful logout
      // setMessage("Logout successful!");
    } catch (error) {
      console.error("Error:", error);
      // setMessage("Logout failed. Please try again." + error);
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Login"
        onClick={handleLogin}
        className="p-button-text custom-button-label"
        style={{ color: "#333" }}
      />
    </div>
  );
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
              <a href="./Homepage#about">About</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
            {!isLoggedIn && (
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
            )}
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
                {isLoggedIn && (
                  <SideBar
                    handleLogout={handleLogout}
                    handleGetItinerary={handleGetItinerary}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
