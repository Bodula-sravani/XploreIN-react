import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Rating } from "primereact/Rating";
import { Loader1 } from "../../Components/Loader/Loader1";
import "./Reviews.css";

export const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const url = "https://localhost:7142/api/UserPosts";

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setReviews([...data]);
        console.log(data);
      } catch (error) {
        setMessage("Please Login to View the Reviews");
      }
    };
    fetchData();
  }, []);
  console.log(message);
  console.log(reviews);
  return (
    <div className="head">
      <h1 className="title">User Reviews</h1>
      <div className="reviews">
        {!reviews && <Loader1 />}
        {!reviews && <p>{message}</p>}
        {reviews &&
          reviews.map((r) => (
            <Card
              title={
                <div className="CardTitle">
                  <div className="userBar">
                    <i className="circle">
                      <img
                        className="circle"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQezTJNezTs00LEX4uen9LhodNnE-cwv8iCsuEIOTcEjTfVRoa2u4Qi8bVPtPO2IgKnZC4&usqp=CAU"
                      />
                    </i>
                    <p>{r.user.userName}</p>
                  </div>
                  {r.destination}
                  <Rating value={r.rating} cancel={false} />
                </div>
              }
              className="Card"
            >
              <p>{r.description}</p>
            </Card>
          ))}
        {reviews && (
          <div>
            <hr></hr>
            <p>
              These are the user experiences about their trips. More features to
              be added soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
