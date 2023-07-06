import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

export const SideBar = ({ handleLogout, handleGetItinerary }) => {
  const [visibleRight, setVisibleRight] = useState(false);
  const token = localStorage.getItem("token");

  const handlePostsClick = () => {};
  const handleLogoutClick = () => {
    handleLogout();
    setVisibleRight(false);
  };

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
      </Sidebar>
    </div>
  );
};
