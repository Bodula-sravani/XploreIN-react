import React from "react";
import { Typedtext } from "../TextAnimation/Typedtext";
import { useRef } from "react";
import { Places } from "../PlaceCategories/Places";

export const HomePage = () => {
  return (
    <div>
      <Typedtext />
      <div style={{ marginTop: "20px" }}></div>
      <Places />
      <div>
        <h1>Our Rural india</h1>
      </div>
      <div id="about">This is the about section</div>
    </div>
  );
};
