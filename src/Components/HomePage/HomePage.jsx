import React from "react";
import { Typedtext } from "../TextAnimation/Typedtext";
import { useRef } from "react";
import { Places } from "../PlaceCategories/Places";
import { Footer } from "../Footer/Footer";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "./HomPage.css";

export const HomePage = () => {
  return (
    <div>
      <Typedtext />
      <div className="places">
        <h1 className="title">Popular Places</h1>
      </div>
      <Places />
      <div>
        <h1 className="title">Our India</h1>
        <div className="aboutIndia">
          <div className="aboutIndia-row">
            <div className="image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvsFSE57PMvAcW5OKb6OggjPl-V6NwGpyzw&usqp=CAU"
                alt="Cultural Image"
              />
            </div>
            <p>
              India is a land of rich heritage and diverse traditions that
              captivate the hearts of travelers from around the world. From
              ancient architectural marvels to vibrant cultural festivals, India
              offers a unique and unforgettable experience.
            </p>
          </div>
          <div className="aboutIndia-row">
            <p>
              India's rich cultural heritage extends to its classical music,
              dance forms, and handicrafts. Traditional art forms like
              Kathakali, Bharatanatyam, and Odissi mesmerize audiences with
              their graceful movements and elaborate costumes.
            </p>
            <div className="image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_eCxiQp2d5p02r0cZ0GAQatFecSPQzBJ3yA&usqp=CAU"
                alt="dances"
              />
            </div>
          </div>
          <p>
            <strong>XploreIN</strong> lets you discover this thorugh its rurual
            Tourism
          </p>
          <p>
            Look some of the places we have in our data and experince{" "}
            <strong>Rural Tourism</strong> of Inida
          </p>
          <Link to="/ruraltourism">
            <Button
              label="Get Started"
              className="startedButton"
              // onClick={() => setActiveComponent("Rural Tourism")}
            />
          </Link>
        </div>
      </div>
      <div className="partners">
        <h1 className="title">Information partners</h1>
        <p>We get our information from our reliable partners</p>
        <div className="whiteBackground">
          <div className="partner">
            <img src="data:image/png;base64,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" />
            Trip Advisor
          </div>
          <div className="partner">
            <img src="https://rapidapi.com/cdn/images?url=https://rapidapi-prod-apis.s3.amazonaws.com/03d4b62f-887b-4fdf-a885-3be1baec452d.jpg" />
            Travel Advisor
          </div>
          <div className="partner">
            <img src="data:image/png;base64,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" />
            OpenWeather
          </div>
        </div>
      </div>
      <div id="Footer">
        <Footer />
      </div>
    </div>
  );
};

{
  /* <h1>About Us</h1>
      <div id="about">
        <div className="Motto">
          Our motto is Simple
          <br />
          India is a place full of heritage, traditions and culture
          <br />
          Embracing the origins of it and enjoy its beauty
          <br /> Come Join us And XploreIN
        </div>
        <div className="MottoImage"></div>
      </div> */
}
