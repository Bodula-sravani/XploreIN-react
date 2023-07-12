import React, { useState, useEffect } from "react";
import { CarouselCard } from "../../Components/Carousel/CarouselCard";
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
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";

export const Products = () => {
  const places = [
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11bWJhaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1570795876989-bcec725b8e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aHlkZXJhYmFkfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1580968668595-57ce9c12e1d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hlbm5haXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1575566668200-7dcaa7b2cf28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGVsaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1558960214-f4283a743867?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amFpcHVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFncmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    "https://c4.wallpaperflare.com/wallpaper/433/264/962/india-pool-oberoi-udaivilas-hotel-wallpaper-preview.jpg",
    "https://images.unsplash.com/photo-1589428983150-c8c675fc2476?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGtlcmVsYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1561361058-c24cecae35ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VmFyYW5hc2l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hpbWxhfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1588096344356-9b497caeeb64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW1yaXRzYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1590766940554-634a7ed41450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXlzb3JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
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
  const [slidesToShow, setSlidesToShow] = useState(3); // Initial number of slides to show

  useEffect(() => {
    const handleResize = () => {
      // Update the number of slides to show based on the window width
      const windowWidth = window.innerWidth;
      if (windowWidth < 600) {
        setSlidesToShow(1);
      } else if (windowWidth < 960) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Call the handleResize function initially
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="myCarousel">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showArrows
        interval={2000}
        swipeable
        emulateTouch
        showIndicators={false}
        centerMode
        centerSlidePercentage={100 / slidesToShow}
      >
        {places.map((place, index) => (
          <div key={index} className="slide-item">
            <div className="image-wrapper">
              <img src={place} className="imageStyle" alt={placesName[index]} />
              <div className="name-overlay">
                <p className="name-text">{placesName[index]}</p>
                <p className="name-text">"{placesDescription[index]}"</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
