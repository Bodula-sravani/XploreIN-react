import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./Profile.css";
import { fontWeight } from "@mui/system";

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
export const Profile = ({ handleGetItinerary, setActiveComponent }) => {
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
    setMessage("Logging...");
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
      console.log(data);
      console.log(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userName", data.userName);
      setMessage("Login Successful!!!");
      setEmail("");
      setPassword("");
      setMessage("");
      setIsLoggedIn(localStorage.getItem("isLoggedIn"));
      setVisibleLogin(false);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Login failed. Please try again.");
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
          const data = await response.json();
          const errorDescriptions = data.errors;
          console.log(errorDescriptions);
          throw new Error(errorDescriptions[0]);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage(error.message);
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
  const handleLogoutClick = () => {
    handleLogout();
    setVisibleRight(false);
  };

  return (
    <div className="flex justify-content-center items-center">
      {!isLoggedIn && (
        <div className="card flex justify-content-center items-center">
          <a
            href="#"
            onClick={handleLoginClick}
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
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
              setIsLoggedIn(localStorage.getItem("isLoggedIn"));
            }}
            draggable={false}
            resizable={false}
          >
            {message && <p className="message">{message}</p>}
            <div className="card">
              <div className="myLoginFlex">
                <div className="LoginForm">
                  <div className="Label">
                    <label htmlFor="email" className="w-24">
                      Email
                    </label>
                    <InputText
                      id="username"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="Label">
                    <label htmlFor="password" className="w-24">
                      Password
                    </label>
                    <InputText
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    label="Login"
                    icon="pi pi-user"
                    className="LoginButton"
                    onClick={handleLogin}
                  ></Button>
                </div>
                <div className="w-full md:w-2 flex items-center justify-center">
                  <Divider
                    layout="vertical"
                    className="flex md:hidden"
                    align="center"
                  >
                    <b>OR</b>
                  </Divider>
                </div>
                <div className="LoginForm">
                  <Button
                    label="Sign Up"
                    icon="pi pi-user-plus"
                    className="p-button-success"
                    onClick={handleRegisterClick}
                  ></Button>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      )}
      <div className="card flex justify-content-center">
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
            setIsLoggedIn(localStorage.getItem("isLoggedIn"));
          }}
          draggable={false}
          resizable={false}
        >
          {message && <p className="message">{message}</p>}
          <div className="card">
            <div className="myLoginFlex">
              <div className="LoginForm">
                <div className="Label">
                  <label htmlFor="email" className="w-24">
                    Email
                  </label>
                  <InputText
                    id="username"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="Label">
                  <label htmlFor="password" className="w-24">
                    Password
                  </label>
                  <InputText
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="Label">
                  <label htmlFor="password" className="w-24">
                    Confrim Password
                  </label>
                  <InputText
                    id="repeatpassword"
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>
                <Button
                  label="Register"
                  icon="pi pi-user"
                  className="LoginButton"
                  onClick={() => {
                    handleRegister(), setVisibleLogin(false);
                  }}
                ></Button>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
      <div>
        {isLoggedIn && (
          <div className="avatar-container">
            <Avatar
              icon="pi pi-user"
              shape="circle"
              onClick={() => setVisibleRight((v) => !v)}
            />
          </div>
        )}
        {visibleRight && (
          <div className="dropdown">
            <ul className="dropdown-menu">
              <li>{localStorage.getItem("userName")}</li>
              <li className="dropdown-item">
                <button
                  onClick={(e) => {
                    handleGetItinerary(e);
                    setVisibleRight(false);
                  }}
                >
                  My itineraries
                </button>
              </li>
              <hr className="dropdown-divider" />
              <li className="dropdown-item" onClick={handleLogoutClick}>
                <button onClick={handleLogoutClick}>Log out</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
