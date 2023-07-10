import React, { useEffect, useState } from "react";
import { useStyles } from "../Styles/LocationDetails";
import "./getlocationdetails.css";
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
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

export const GetLocationData = ({ location, setLocationData }) => {
  const [dataFetched, setDataFetched] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState(location);
  const [temp, setTemperature] = useState(0);
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(null);
  const [forecasts, setForecasts] = useState([]);
  const classes = useStyles(Card);
  console.log("location: " + location);
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${location}&lang=en_US&units=km`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "fb5824916amsh4004a24127104dbp11ff4fjsn363449964e8e",
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
    };
    const handleWeather = async () => {
      if (search !== "") {
        const apiKey = "24034b357fbbed95a577df3566ce4210";
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
          );
          const data = await response.json();
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;
          setTemperature(temperature);
          setDescription(description);
          setIcon(icon);

          const response2 = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
          );
          const data2 = await response2.json();

          const filteredForecasts = data2.list.filter(
            (item, index) => index % 8 === 0
          );
          console.log("Thsi is from wather doata");
          console.log(data2);
          setForecasts([...filteredForecasts]);
        } catch (error) {
          console.log("An error occurred:", error);
        }
      }
    };

    fetchData();
    handleWeather();
  }, [location]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };
  if (isLoading) {
    return <div className="locationdetail">Loading...</div>;
  } else {
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
            <Button
              label="View Weather"
              className="searchButton"
              onClick={(e) => {
                e.preventDefault();
                setVisible(true);
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "black",
              }}
            />
          </Grid>
        </CardActions>
        <Dialog
          header="Weather"
          visible={visible}
          style={{
            width: "50vw",
            background: new URL(
              "https://t4.ftcdn.net/jpg/04/97/80/99/360_F_497809944_FMo3DO6j7XSlb9rZKOlnqaaWoJhuZXBm.jpg"
            ),
          }}
          onHide={() => setVisible(false)}
        >
          <div className="weather-info">
            <div className="TodayWeather">
              <img
                className="weather-icon"
                src={`http://openweathermap.org/img/w/${icon}.png`}
                alt="Weather Icon"
              />
              <div className="temperature">{temp}°C</div>
              <div className="description">{description}</div>
              <div className="location">{location}</div>
            </div>
            <div className="forecast-container">
              {forecasts.map((forecast) => (
                <div key={forecast.dt} className="forecast-card">
                  <div className="forecast-day">{formatDate(forecast.dt)}</div>
                  <img
                    className="forecast-icon"
                    src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                    alt="Forecast Icon"
                  />
                  <div className="forecast-temp">{forecast.main.temp}°C</div>
                </div>
              ))}
            </div>
          </div>
        </Dialog>
      </Card>
    );
  }
};
