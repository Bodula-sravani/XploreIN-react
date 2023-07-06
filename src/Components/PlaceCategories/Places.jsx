import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mumbai from "../../assets/mumbai.jpg";
import Hyderabad from "../../assets/Hyderabad.jpg";
import goa from "../../assets/goa.jpg";
import newDelhi from "../../assets/newDelhi.jpg";

import "./Places.css";

const places = [mumbai, Hyderabad, goa, mumbai, newDelhi];
const placesName = ["mumbai", "Hyderabad", "goa", "mumbai", "newDelhi"];
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
      </div>
    ));
  };
  return (
    // <div className="root">
    //   <div className="Places">
    //     <div className="Place Hillstations">
    //       <div className="text">Hillstations</div>
    //     </div>
    //     <div className="Place Beaches">
    //       <div className="text">Beaches</div>
    //     </div>
    //     <div className="Place Temples">
    //       <div className="text">Temples</div>
    //     </div>
    //     <div className="Place Urban">
    //       <div className="text">Urban</div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex items-center justify-center myCarousel">
      <div className="w-full">
        <Slider {...settings}>{renderImages()}</Slider>
      </div>
    </div>
  );
};
