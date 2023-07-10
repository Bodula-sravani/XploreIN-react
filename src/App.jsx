import { useEffect, useState } from "react";
import "./App.css";
import { NavBar } from "./Components/Header/NavBar";
import { HomePage } from "./Components/HomePage/HomePage";
import { Destination } from "./Components/DisplayDestination/Destination";
import { Itinerary } from "./Itineraries/Itinerary";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserPosts } from "./Components/UserPosts/UserPosts";
import { Reviews } from "./Components/Reviews/Reviews";

function App() {
  const [search, setSearch] = useState("");
  const [activeComponent, setActiveComponent] = useState("HomePage");
  const [itineraryData, setItineraryData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleDestinationSearch = (e) => {
    e.preventDefault();
    if (search !== "") {
      setActiveComponent("Destinantion");
    }
  };

  const handleGetItinerary = async () => {
    setToken(localStorage.getItem("token"));
    const url = "https://localhost:7142/api/UserItineraries";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setActiveComponent("Itineraries");
        setItineraryData(data);
        console.log(data);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePostItinerary = async (ItineraryModel) => {
    const url = "https://localhost:7142/api/UserItineraries";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ItineraryModel),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        handleGetItinerary();
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteItinrary = async (id) => {
    const url = `https://localhost:7142/api/UserItineraries/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        //const data = await response.json();
        handleGetItinerary();
        // console.log(data);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateItinrary = async (ItineraryModel) => {
    const url = `https://localhost:7142/api/UserItineraries/${ItineraryModel.id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ItineraryModel),
      });

      if (response.ok) {
        // const data = await response.json();
        // console.log(data);
        handleGetItinerary();
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <NavBar
        onSearch={handleSearch}
        handleDestinationSearch={handleDestinationSearch}
        handleGetItinerary={handleGetItinerary}
        setActiveComponent={setActiveComponent}
      />
      {activeComponent === "HomePage" && <HomePage />}
      {activeComponent === "Destinantion" && <Destination search={search} />}
      {activeComponent === "Itineraries" && (
        <Itinerary
          data={itineraryData}
          handlePostItinerary={handlePostItinerary}
          handleDeleteItinrary={handleDeleteItinrary}
          handleUpdateItinrary={handleUpdateItinrary}
        />
      )}
      {activeComponent === "UserPosts" && <UserPosts />}
      {activeComponent === "Reviews" && <Reviews />}
    </>
  );
}

export default App;
