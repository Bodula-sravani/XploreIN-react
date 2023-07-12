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
import { Loader1 } from "../Loader/Loader1";

class MyFavoriteModel {
  constructor() {
    this.id = 0;
    this.placeName = "";
    this.photoUrl = "";
    this.userId = "string";
    this.user = {
      id: "string",
      userName: "string",
      normalizedUserName: "string",
      email: "string",
      normalizedEmail: "string",
      emailConfirmed: true,
      passwordHash: "string",
      securityStamp: "string",
      concurrencyStamp: "string",
      phoneNumber: "string",
      phoneNumberConfirmed: true,
      twoFactorEnabled: true,
      lockoutEnd: "2023-07-10T12:18:00.671Z",
      lockoutEnabled: true,
      accessFailedCount: 0,
    };
  }
}

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
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${location}&lang=en_US&units=km`;
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

        setLocationData({ name, latitude, longitude });
        setIsLoading(false);
        console.log("invoked api");
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

  const [favFormData, setFavFormData] = useState(new MyFavoriteModel());
  const [favData, setFavData] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favId, setFavId] = useState(null);

  const getFav = async () => {
    const token = localStorage.getItem("token");
    const url = "https://localhost:7142/api/UserFavorites";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFavData([...data]);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getFav();
  }, []);

  useEffect(() => {
    if (favData && dataFetched) {
      for (let i = 0; i < favData.length; i++) {
        if (favData[i].placeName === dataFetched.name) {
          setIsFavorited(true);
          setFavId(favData[i].id);
        }
      }
    }
  }, [favData, dataFetched]);

  const handleFavClick = async (name, photo) => {
    const token = localStorage.getItem("token");
    const url = "https://localhost:7142/api/UserFavorites";
    setFavFormData((prevData) => ({
      ...prevData,
      placeName: name,
      photoUrl: photo,
    }));
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favFormData),
      });
      if (response.ok) {
        setIsFavorited(true);
        getFav();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const url = `https://localhost:7142/api/UserFavorites/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        getFav();
        setIsFavorited(false);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="load1Center">
        <Loader1 />
      </div>
    );
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
            {favData && dataFetched && (
              <Button
                icon={isFavorited ? "pi pi-heart-fill" : "pi pi-heart"}
                className="favButton"
                onClick={() => {
                  isFavorited
                    ? handleDelete(favId)
                    : handleFavClick(
                        dataFetched.name,
                        dataFetched.photo.images.small.url
                      );
                }}
              ></Button>
            )}
          </Grid>
        </CardActions>
        <Dialog
          header="Weather"
          visible={visible}
          style={{
            width: "50vw",
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
