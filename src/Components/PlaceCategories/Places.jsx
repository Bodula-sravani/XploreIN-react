// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import mumbai from "../../assets/mumbai.jpg";
// import Hyderabad from "../../assets/Hyderabad.jpg";
// import goa from "../../assets/goa.jpg";
// import chennai from "../../assets/chennai.jpg";
// import newDelhi from "../../assets/newDelhi.jpg";

// import "./Places.css";

// const places = [mumbai, Hyderabad, chennai, newDelhi, goa];
// const placesName = ["Mumbai", "Hyderabad", "Chennai", "New Delhi", "Goa"];
// export const Places = () => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     centerMode: true,
//     centerPadding: "0px",
//   };

//   const renderImages = () => {
//     return places.map((place, index) => (
//       <div key={index}>
//         <div className="shadow slide-item transition-all">
//           <img
//             src={place}
//             className="object-cover h-48 rounded"
//             style={{ borderRadius: "10px" }}
//           />
//         </div>
//         <div className="name-overlay">
//           <p className="name-text">{placesName[index]}</p>
//         </div>
//       </div>
//     ));
//   };
//   return (
//     <div className="flex items-center justify-center myCarousel">
//       <div className="w-full">
//         <Slider {...settings}>{renderImages()}</Slider>
//       </div>
//     </div>
//   );
// };

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mumbai from "../../assets/mumbai.jpg";
import Hyderabad from "../../assets/Hyderabad.jpg";
import goa from "../../assets/goa.jpg";
import chennai from "../../assets/chennai.jpg";
import newDelhi from "../../assets/newDelhi.jpg";
import jaipur from "../../assets/jaipur.jpg";
import Agra from "../../assets/Agra.jpg";
import udaipur from "../../assets/udaipur.jpg";
import kerela from "../../assets/kerela.jpg";
import varanasi from "../../assets/varanasi.jpg";
import shimla from "../../assets/shimla.jpg";
import amritsar from "../../assets/amritsar.jpg";
import mysore from "../../assets/mysore.jpg";

import "./Places.css";

const places = [
  mumbai,
  Hyderabad,
  chennai,
  newDelhi,
  goa,
  jaipur,
  Agra,
  udaipur,
  kerela,
  varanasi,
  shimla,
  amritsar,
  mysore,
];
const placesName = [
  "Mumbai",
  "Hyderabad",
  "Chennai",
  "New Delhi",
  "Goa",
  "Jaipur",
  "Agra",
  "Udaipur",
  "Kerala",
  "Varanasi",
  "Shimla",
  "Amritsar",
  "Mysore",
];

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

export const Places = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const renderImages = () => {
    return places.map((place, index) => (
      <div key={index}>
        <div className="shadow slide-item transition-all">
          <img src={place} className="object-cover h-48 rounded imageStyle" />
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
