import React, { useEffect, useState } from "react";
import DisplayCard from "../DisplayCardComponent/DisplayCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export const GetLocationResturants = ({ type, lat, lon }) => {
  const [places, setPlaces] = useState([]);
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

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "700px", height: "700px" }}>
        <Carousel
          key={type}
          showThumbs={false}
          style={{ width: "700px", height: "700px !important" }}
        >
          {displayedPlaces.map((place) => (
            <div key={place.id}>
              <DisplayCard type={type} place={place} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
