import React, { useEffect, useState } from "react";
import DisplayCard from "../DisplayCardComponent/DisplayCard";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { height } from "@mui/system";

export const GetLocationResturants = ({ type, lat, lon }) => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng?latitude=${lat}&longitude=${lon}&lang=en_US&units=km`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "3c310f413bmsh5a73d047bf06250p1848ebjsn54a086f4e0cf",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        setPlaces(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [lat, lon]);
  console.log("type");
  console.log(type);
  console.log(lat);
  console.log(lon);
  console.log("result");
  console.log(places);

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

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "700px", height: "700px" }}>
        <Carousel
          showThumbs={false}
          style={{ width: "700px", height: "700px !important" }}
        >
          {displayedPlaces.map((place) => (
            <div key={place.id}>
              <DisplayCard place={place} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
    // <div className="card">
    //   <Carousel
    //     value={displayedPlaces}
    //     numVisible={3}
    //     numScroll={3}
    //     responsiveOptions={responsiveOptions}
    //     className="custom-carousel"
    //     circular
    //     autoplayInterval={3000}
    //     itemTemplate={DisplayCard}
    //   />
    // </div>
  );
};
