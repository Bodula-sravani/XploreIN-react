import React from "react";
import { Typedtext } from "../TextAnimation/Typedtext";
import { useRef } from "react";
import { Places } from "../PlaceCategories/Places";
import "./HomPage.css";

export const HomePage = () => {
  return (
    <div>
      <Typedtext />
      <div style={{ marginTop: "20px" }}></div>
      <Places />
      <div id="India">
        <h1>Our India</h1>
        <div
          className="flex justify-center"
          style={{ width: "100%", height: "100px" }}
        >
          Stuff About things in India
        </div>
      </div>
      <h1>About Us</h1>
      <div id="about">
        <div className="Motto">
          Our motto is Simple
          <br />
          India is a place full of heritage, traditions and culture
          <br />
          Embracing the origins of it and enjoy its beauty
          <br /> Come Join us And XploreIN
        </div>
        <div className="MottoImage"></div>
      </div>
    </div>
  );
};
