import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./Components/Header/NavBar";
import { HomePage } from "./Components/HomePage/HomePage";
import { Destination } from "./Components/DisplayDestination/Destination";
import { Itinerary } from "./Itineraries/Itinerary";
import { UserPosts } from "./Components/UserPosts/UserPosts";
import { RuralIndia } from "./Components/RuralIndia/RuralIndia";
import { Reviews } from "./Components/Reviews/Reviews";
import { Favourites } from "./Components/Favourites/Favourites";
import { ItineraryItem } from "./Itineraries/ItineraryItem";

function App() {
  const [search, setSearch] = useState("");
  const [activeComponent, setActiveComponent] = useState("HomePage");

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleDestinationSearch = (e) => {
    e.preventDefault();
    if (search !== "") {
      window.location.href = `/destination?search=${search}`;
    }
  };

  return (
    <Router>
      <NavBar
        onSearch={handleSearch}
        handleDestinationSearch={handleDestinationSearch}
        setActiveComponent={setActiveComponent}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/itineraries" element={<Itinerary />} />
        <Route path="/userposts" element={<UserPosts />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/ruraltourism" element={<RuralIndia />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/ItineraryItem/:id" element={<ItineraryItem />} />
      </Routes>
    </Router>
  );
}
// function App() {
//   const [search, setSearch] = useState("");
//   const [activeComponent, setActiveComponent] = useState("HomePage");

//   const handleSearch = (value) => {
//     setSearch(value);
//   };

//   const handleDestinationSearch = (e) => {
//     e.preventDefault();
//     if (search !== "") {
//       setActiveComponent("Destinantion");
//     }
//   };

//   return (
//     <>
//       <NavBar
//         onSearch={handleSearch}
//         handleDestinationSearch={handleDestinationSearch}
//         setActiveComponent={setActiveComponent}
//       />
//       {activeComponent === "HomePage" && (
//         <HomePage setActiveComponent={setActiveComponent} />
//       )}
//       {activeComponent === "Destinantion" && <Destination search={search} />}
//       {activeComponent === "Itineraries" && <Itinerary />}
//       {activeComponent === "UserPosts" && <UserPosts />}
//       {activeComponent === "Reviews" && <Reviews />}
//       {activeComponent === "Rural Tourism" && <RuralIndia />}
//     </>
//   );
// }

export default App;

// const handleGetItinerary = async () => {
//   setToken(localStorage.getItem("token"));
//   const url = "https://localhost:7142/api/UserItineraries";

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setActiveComponent("Itineraries");
//       setItineraryData(data);
//       console.log(data);
//     } else {
//       throw new Error("Request failed with status " + response.status);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// const handlePostItinerary = async (ItineraryModel) => {
//   const url = "https://localhost:7142/api/UserItineraries";

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(ItineraryModel),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       handleGetItinerary();
//     } else {
//       throw new Error("Request failed with status " + response.status);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// const handleDeleteItinrary = async (id) => {
//   const url = `https://localhost:7142/api/UserItineraries/${id}`;

//   try {
//     const response = await fetch(url, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       //const data = await response.json();
//       handleGetItinerary();
//       // console.log(data);
//     } else {
//       throw new Error("Request failed with status " + response.status);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// const handleUpdateItinrary = async (ItineraryModel) => {
//   const url = `https://localhost:7142/api/UserItineraries/${ItineraryModel.id}`;
//   try {
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(ItineraryModel),
//     });

//     if (response.ok) {
//       // const data = await response.json();
//       // console.log(data);
//       handleGetItinerary();
//     } else {
//       throw new Error("Request failed with status " + response.status);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
