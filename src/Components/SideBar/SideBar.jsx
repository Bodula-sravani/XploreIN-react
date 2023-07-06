import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./SideBar.css";

class RegisterModel {
  constructor() {
    this.id = "";
    this.userName = "";
    this.normalizedUserName = "";
    this.email = "";
    this.normalizedEmail = "";
    this.emailConfirmed = true;
    this.passwordHash = "";
    this.securityStamp = "";
    this.concurrencyStamp = "";
    this.phoneNumber = "";
    this.phoneNumberConfirmed = true;
    this.twoFactorEnabled = true;
    this.lockoutEnd = new Date().toISOString();
    this.lockoutEnabled = true;
    this.accessFailedCount = 0;
  }
}
export const SideBar = ({ handleGetItinerary, setActiveComponent }) => {
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleRegister, setVisibleRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
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

  const handleRegister = async () => {
    const url = "https://localhost:7142/api/auth/register";

    if (password === repeatPassword && password !== "") {
      const registerModel = new RegisterModel();
      registerModel.email = email;
      registerModel.passwordHash = password;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerModel),
        });

        if (response.ok) {
          setMessage("Registration successful!");
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage(error);
      }
    } else {
      setMessage("Passwords did not match");
    }
  };

  const handleLoginClick = () => {
    setVisibleLogin(true);
  };

  const handleRegisterClick = () => {
    setVisibleRegister(true);
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

  const handlePostsClick = () => {};
  const handleLogoutClick = () => {
    handleLogout();
    setVisibleRight(false);
  };

  const footerContentLogin = (
    <div>
      <Button
        label="Login"
        onClick={handleLogin}
        className="p-button-text custom-button-label"
        style={{ color: "#333" }}
      />
    </div>
  );

  const footerContentRegister = (
    <div>
      <Button
        label="Register"
        onClick={handleRegister}
        className="p-button-text custom-button-label"
        style={{ color: "#333" }}
      />
    </div>
  );

  return (
    <div>
      {/* <Button icon="pi pi-arrow-left" onClick={() => setVisibleRight(true)} /> */}
      <Avatar
        icon="pi pi-user"
        style={{ backgroundColor: "transparent", color: "black" }}
        shape="circle"
        onClick={() => setVisibleRight(true)}
      />
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <ul>
          {!isLoggedIn && (
            <li>
              <div className="card flex justify-content-center">
                <a href="#" onClick={handleLoginClick}>
                  Login
                </a>
                <Dialog
                  header="Login"
                  visible={visibleLogin}
                  position="center"
                  style={{ width: "50vw" }}
                  onHide={() => {
                    setVisibleLogin(false);
                    setEmail("");
                    setPassword("");
                    setMessage("");
                    setIsLoggedIn(localStorage.getItem("isLoggedIn")); // Reset the message when the dialog is closed
                  }}
                  draggable={false}
                  resizable={false}
                  footer={footerContentLogin}
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
              <div className="card flex justify-content-center">
                <a href="#" onClick={handleRegisterClick}>
                  Register
                </a>
                <Dialog
                  header="Register"
                  visible={visibleRegister}
                  position="center"
                  style={{ width: "50vw" }}
                  onHide={() => {
                    setVisibleRegister(false);
                    setEmail("");
                    setPassword("");
                    setRepeatPassword("");
                    setMessage("");
                    setIsLoggedIn(localStorage.getItem("isLoggedIn")); // Reset the message when the dialog is closed
                  }}
                  draggable={false}
                  resizable={false}
                  footer={footerContentRegister}
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
                    <label id="passwordConfrim">Repeat password</label>
                    <input
                      type="password"
                      placeholder="Confrim password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </form>
                </Dialog>
              </div>
            </li>
          )}
          {isLoggedIn && (
            <ul>
              <button
                onClick={(e) => {
                  handleGetItinerary(e);
                  setVisibleRight(false);
                }}
              >
                My itineraries
              </button>
              <hr />
              <button onClick={handlePostsClick}>My posts</button>
              <hr />
              <button onClick={handleLogoutClick}>Log out</button>
              <hr />
            </ul>
          )}
        </ul>
      </Sidebar>
    </div>
  );
};
