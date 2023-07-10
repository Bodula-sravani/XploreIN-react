import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Rating } from "primereact/Rating";
import "./Reviews.css";

export const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const url = "https://localhost:7142/api/UserPosts";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //   if (response.status === "ok") {
      const data = await response.json();
      setReviews([...data]);
      console.log(data);
      //   }
    };
    fetchData();
  }, []);
  return (
    <div className="reviews">
      {reviews &&
        reviews.map((r) => (
          <Card
            title={
              <div className="CardTitle">
                <div className="userBar">
                  <i className="pi pi-user"></i>
                  <p>{r.user.userName}</p>
                </div>
                {r.destination}
                <Rating value={r.rating} cancel={false} />
              </div>
            }
            className="Card"
          >
            <p>{r.description}</p>
            <p></p>
          </Card>
        ))}
    </div>
  );
};
