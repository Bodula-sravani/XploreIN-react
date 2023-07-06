import React, { useEffect, useState } from "react";
import { useStyles } from "../Styles/LocationDetails";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Grid,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const GetLocationData = ({ location, setLocationData }) => {
  const [dataFetched, setDataFetched] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles(Card);
  console.log("location: " + location);
  useEffect(() => {
    const fetchData = async () => {
      if (location !== "") {
        const url = `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${location}&lang=en_US&units=km`;
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

          // Filter results for Indian cities and places
          const indianResults = result.data.filter((item) => {
            const locationString = item.result_object.location_string;
            const ancestors = item.result_object.ancestors;

            // Check if the location_string or ancestors contain references to India
            return (
              locationString.includes("India") ||
              ancestors.some((ancestor) => ancestor.name.includes("India"))
            );
          });
          // Extract desired information from the first result
          const {
            name,
            photo,
            description,
            parent_display_name,
            latitude,
            longitude,
          } = indianResults[0].result_object;

          // Set the data state variable
          setDataFetched({
            name,
            photo,
            description,
            parent_display_name,
            latitude,
            longitude,
          });

          console.log("data fectehc");
          console.log(dataFetched);

          setLocationData({ name, latitude, longitude });
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [location]);

  if (isLoading) {
    return <div style={{ alignContent: "center" }}>Loading...</div>;
  }
  console.log(dataFetched.photo.images.large.url);
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        component="img"
        src={dataFetched.photo.images.large.url}
        title={dataFetched.name}
        style={{ height: "500px" }}
      />
      <Typography variant="h1" className={classes.name}>
        {dataFetched.name}
      </Typography>
      <CardContent>
        <Typography variant="body1" className={classes.description}>
          {dataFetched.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="center" alignItems="center">
          <LocationOnIcon />
          <Typography variant="body2">
            {dataFetched.parent_display_name}
          </Typography>
        </Grid>
      </CardActions>
    </Card>
  );
};

// import React, { useEffect, useState } from "react";

// export const GetLocationData = ({ location, setLocationData }) => {
//   const [dataFetched, setDataFetched] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   console.log("entered location");
//   useEffect(() => {
//     const fetchData = async () => {
//       const url = `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${location}&lang=en_US&units=km`;
//       const options = {
//         method: "GET",
//         headers: {
//           "X-RapidAPI-Key":
//             "a172a4073emshf53924718d8875dp180961jsn5f45e7c0a6e5",
//           "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
//         },
//       };

//       try {
//         const response = await fetch(url, options);
//         const result = await response.json();

//         const indianResults = result.data.filter((item) => {
//           const locationString = item.result_object.location_string;
//           const ancestors = item.result_object.ancestors;

//           return (
//             locationString.includes("India") ||
//             ancestors.some((ancestor) => ancestor.name.includes("India"))
//           );
//         });

//         const {
//           name,
//           photo,
//           description,
//           parent_display_name,
//           latitude,
//           longitude,
//         } = indianResults[0].result_object;

//         setDataFetched({
//           name,
//           photo,
//           description,
//           parent_display_name,
//           latitude,
//           longitude,
//         });

//         setLocationData([name, latitude, longitude]);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//   }, [location]);

//   if (isLoading) {
//     return <div style={{ alignContent: "center" }}>Loading...</div>;
//   }
//   console.log(location);
//   console.log(dataFetched);
//   return (
//     <div>
//       <h2>{dataFetched.name}</h2>
//       <img src={dataFetched.photo.images.large.url} alt={dataFetched.name} />
//       <p>{dataFetched.description}</p>
//       <p className="Address">Address: {dataFetched.parent_display_name}</p>
//     </div>
//   );
// };
