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
import { GetLocationResturants } from "../Api/GetLocationResturants";

export const Destination = ({ search }) => {
  const [locationData, setLocationData] = useState(null);
  const types = ["attractions", "restaurants", "hotels"];
  console.log("search::: " + search);
  console.log("loc dta");
  console.log(locationData);

  // useEffect(() => {
  //   // Call the GetLocationData component here
  //   GetLocationData({ location: search, setLocationData: setLocationData });
  // }, [search, setLocationData]);

  return (
    <>
      {/* Render the GetLocationData component */}
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
