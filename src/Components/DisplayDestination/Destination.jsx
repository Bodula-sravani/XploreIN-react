import { React, useEffect, useState, Fragment } from "react";
import { GetLocationData } from "../Api/GetLocationDetails";
import { GetLocationResturants } from "../Api/GetLocationData";
import { Button } from "primereact/button";
import "./Destination.css";

export const Destination = () => {
  const [locationData, setLocationData] = useState(null);
  const [type, setType] = useState("");
  const types = ["restaurants", "attractions", "hotels"];
  //, "attractions", "hotels"];
  const search = new URLSearchParams(location.search).get("search");
  return (
    <>
      <div style={{ marginTop: "70px" }}></div>
      <GetLocationData location={search} setLocationData={setLocationData} />
      {/* <hr /> */}
      {locationData ? (
        <div>
          <div className="buttonList">
            <Button
              label="Restaurants"
              onClick={() => setType("restaurants")}
            ></Button>
            <Button
              label="Attractions"
              onClick={() => setType("attractions")}
            ></Button>
            <Button label="Hotels" onClick={() => setType("hotels")}></Button>
          </div>
          {type && (
            <Fragment key={type}>
              <h1 className="title">{type.toUpperCase()}</h1>
              <GetLocationResturants
                type={type}
                lat={locationData.latitude}
                lon={locationData.longitude}
              />
            </Fragment>
          )}
        </div>
      ) : null}
    </>
  );
};

// types.map((type) => (
// <Fragment key={type}>
//   <h1 className="title">{type.toUpperCase()}</h1>
//   <GetLocationResturants
//     type={type}
//     lat={locationData.latitude}
//     lon={locationData.longitude}
//   />
// </Fragment>
//   ))
