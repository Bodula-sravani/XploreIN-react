import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mumbai from "../../assets/mumbai.jpg";
import Hyderabad from "../../assets/Hyderabad.jpg";
import goa from "../../assets/goa.jpg";
import chennai from "../../assets/chennai.jpg";
import newDelhi from "../../assets/newDelhi.jpg";

import "./Places.css";

const places = [mumbai, Hyderabad, chennai, newDelhi, goa];
const placesName = ["Mumbai", "Hyderabad", "Chennai", "New Delhi", "Goa"];
export const Places = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };

  const renderImages = () => {
    return places.map((place, index) => (
      <div key={index}>
        <div className="shadow slide-item transition-all">
          <img
            src={place}
            className="object-cover h-48 rounded"
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="name-overlay">
          <p className="name-text">{placesName[index]}</p>
        </div>
      </div>
    ));
  };
  return (
    <div className="flex items-center justify-center myCarousel">
      <div className="w-full">
        <Slider {...settings}>{renderImages()}</Slider>
      </div>
    </div>
  );
};
