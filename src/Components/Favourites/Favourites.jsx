import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./Favourites.css";

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

export const Favourites = () => {
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
    if (favData) {
      for (let i = 0; i < favData.length; i++) {
        if (favData[i].placeName === "wayanad") {
          setIsFavorited(true);
          setFavId(favData[i].id);
        } else {
          setIsFavorited(false);
        }
      }
    }
  }, [favData]);

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

  return (
    <>
      <div style={{ margin: "80px" }}></div>
      <h1 className="title">Favorites</h1>
      <div className="Posts">
        {favData &&
          favData.map((post) => (
            <Card className="customCard" key={post.id}>
              <div className="customHeader">
                <img src={post.photoUrl} alt="Header" className="headerImage" />
              </div>
              <div className="cardContent">
                <div className="cardTitle">
                  <p>{post.placeName}</p>
                  <Button
                    icon="pi pi-trash"
                    className="trashButton"
                    onClick={() => handleDelete(post.id)}
                  />
                </div>
                <p>{post.description}</p>
              </div>
            </Card>
          ))}
      </div>
    </>
  );
};
