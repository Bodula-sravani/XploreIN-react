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

const placesDescription = [
  "Mumbai is a bustling city known for its vibrant culture, Bollywood film industry, and iconic landmarks like the Gateway of India.",
  "Hyderabad, the 'City of Pearls,' offers a rich blend of history and modernity, with its magnificent architecture, delicious biryani, and charming Old City.",
  "Chennai, the capital of Tamil Nadu, is renowned for its beautiful beaches, classical music, and rich cultural heritage.",
  "New Delhi, the capital of India, showcases a mix of ancient and modern attractions, including historical monuments, bustling markets, and political landmarks.",
  "Goa is a popular beach destination famous for its pristine sandy shores, vibrant nightlife, and Portuguese-influenced architecture.",
  "Jaipur, the 'Pink City,' captivates visitors with its magnificent palaces, bustling bazaars, and royal heritage of Rajputana.",
  "Agra is home to the awe-inspiring Taj Mahal, a UNESCO World Heritage Site and one of the Seven Wonders of the World.",
  "Udaipur, often called the 'City of Lakes,' is renowned for its enchanting palaces, scenic lakes, and romantic ambiance.",
  "Kerala, known as 'God's Own Country,' offers breathtaking backwaters, serene beaches, lush greenery, and Ayurvedic treatments.",
  "Varanasi, situated on the banks of the sacred Ganges River, is a spiritual city with ancient temples, ghats, and mesmerizing Ganga Aarti.",
  "Shimla, nestled in the Himalayas, is a popular hill station known for its colonial architecture, scenic landscapes, and pleasant weather.",
  "Amritsar is home to the iconic Golden Temple, a spiritual and cultural center for Sikhs, and the vibrant Wagah Border ceremony.",
  "Mysore, with its magnificent Mysore Palace, silk sarees, and rich cultural heritage, is a city of grandeur and royal charm.",
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
    // slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const renderImages = () => {
    return places.map((place, index) => (
      <div key={index} className="slide-item">
        <div className="image-wrapper">
          <img src={place} className="object-cover h-48 rounded imageStyle" />
          <div className="name-overlay">
            <p className="name-text">{placesName[index]}</p>
            <p className="name-text">{placesDescription[index]}</p>
          </div>
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
