import { React, useEffect, useState, Fragment } from "react";
import { GetLocationData } from "../Api/GetLocationDetails";
import { GetLocationResturants } from "../Api/GetLocationData";

export const Destination = () => {
  const [locationData, setLocationData] = useState(null);
  const types = ["restaurants", "attractions", "hotels"];
  const search = new URLSearchParams(location.search).get("search");
  console.log("serahc:" + search);
  return (
    <>
      <div style={{ marginTop: "80px" }}></div>
      <GetLocationData location={search} setLocationData={setLocationData} />
      <hr />
      {locationData
        ? types.map((type) => (
            <Fragment key={type}>
              <p>{type.toUpperCase()}</p>
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
