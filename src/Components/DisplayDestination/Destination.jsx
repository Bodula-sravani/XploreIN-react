import { React, useEffect, useState, Fragment } from "react";
import { GetLocationData } from "../Api/GetLocationDetails";
import { GetLocationResturants } from "../Api/GetLocationData";

export const Destination = () => {
  const [locationData, setLocationData] = useState(null);
  const types = ["restaurants", "attractions", "hotels"];
  //, "attractions", "hotels"];
  const search = new URLSearchParams(location.search).get("search");
  return (
    <>
      <div style={{ marginTop: "70px" }}></div>
      <GetLocationData location={search} setLocationData={setLocationData} />
      {/* <hr /> */}
      {locationData
        ? types.map((type) => (
            <Fragment key={type}>
              <h1 className="title">{type.toUpperCase()}</h1>
              <GetLocationResturants
                type={type}
                lat={locationData.latitude}
                lon={locationData.longitude}
              />
            </Fragment>
          ))
        : null}
    </>
  );
};
