import React, { useEffect, useState } from "react";
import DisplayCard from "../DisplayCardComponent/DisplayCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Loader1 } from "../Loader/Loader1";
import { height } from "@mui/system";
export const GetLocationResturants = ({ type, lat, lon }) => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng?latitude=${lat}&longitude=${lon}&lang=en_US&units=km`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "75df3e2e49msh5b598745780934bp1b21a2jsn3bf0d9f05b1a",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        setPlaces(result.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [lat, lon]);

  const filteredPlaces = places.filter((place) => {
    return (
      place.name &&
      place.rating &&
      place.num_reviews &&
      place.photo &&
      place.photo.images &&
      place.photo.images.large &&
      place.address &&
      place.phone
    );
  });

  let displayedPlaces = filteredPlaces;

  if (filteredPlaces.length < 20) {
    const remainingPlaces = places.filter(
      (place) => !filteredPlaces.includes(place)
    );
    const sortedPlaces = remainingPlaces.sort(
      (a, b) => countMatchingCriteria(b) - countMatchingCriteria(a)
    );
    displayedPlaces = [
      ...filteredPlaces,
      ...sortedPlaces.slice(0, 20 - filteredPlaces.length),
    ];
  }

  function countMatchingCriteria(place) {
    let count = 0;
    if (place.name) count++;
    if (place.rating) count++;
    if (place.num_reviews) count++;
    if (place.photo && place.photo.images && place.photo.images.large) count++;
    if (place.address) count++;
    if (place.phone) count++;
    return count;
  }
  const [slidesToShow, setSlidesToShow] = useState(2); // Initial number of slides to show

  useEffect(() => {
    const handleResize = () => {
      // Update the number of slides to show based on the window width
      const windowWidth = window.innerWidth;
      if (windowWidth < 600) {
        setSlidesToShow(1);
      } else if (windowWidth < 960) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(2);
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

  if (isLoading) {
    return (
      <div className="load1Center">
        <Loader1 />
      </div>
    );
  } else {
    return (
      <div key={type} className="carouselDiv">
        <Carousel
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
          {displayedPlaces.map((place) => (
            <div
              className="slide-item"
              key={place.id}
              style={{ height: "700px", width: "500px" }}
            >
              <DisplayCard type={type} place={place} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
};
