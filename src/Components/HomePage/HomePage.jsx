import React from "react";
import { Typedtext } from "../TextAnimation/Typedtext";
import { useRef } from "react";
import { Places } from "../PlaceCategories/Places";
import { Footer } from "../Footer/Footer";
import "./HomPage.css";

export const HomePage = () => {
  return (
    <div>
      <Typedtext />
      <div style={{ margin: "20px" }}>
        <h1>Popular Places</h1>
      </div>
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
      <div className="partners">
        <h1>Information partners</h1>
        <p>We get our information from our reliable partners</p>
        <div className="whiteBackground">
          <div>Trip Advisor</div>
          <div>Travel Advisor</div>
          <div>OpenWeather</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
