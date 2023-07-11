// import { React, useEffect, useState, Fragment } from "react";
// import { GetLocationData } from "../Api/GetLocationDetails";
// import { GetLocationResturants } from "../Api/GetLocationResturants";

// export const Destination = ({ search }) => {
//   const [locationData, setLocationData] = useState([null, null, null]);
//   const types = ["restaurants", "hotels", "attractions"];
//   console.log("searhc" + search);
//   console.log(locationData);
//   return (
//     <>
//       <GetLocationData location={search} setLocationData={setLocationData} />
//       <hr />
//       {locationData
//         ? types.map((type) => (
//             <Fragment key={type}>
//               <p>{type}</p>
//               {/* Destructure locationData */}
//               const [name, latitude, longitude] = locationData;
//               <GetLocationResturants
//                 type={type}
//                 lat={latitude}
//                 lon={longitude}
//               />
//             </Fragment>
//           ))
//         : null}
//     </>
//   );
// };

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
