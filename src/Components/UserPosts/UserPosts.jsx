import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Rating } from "primereact/Rating";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";

import "./UserPosts.css";

class MyPostModel {
  constructor() {
    this.id = 0;
    this.destination = "";
    this.description = "";
    this.created_date = "2023-07-10T12:18:00.671Z";
    this.rating = 0;
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

export const UserPosts = () => {
  const [visisbleForm, setVisibleForm] = useState(false);
  const [formData, setFormData] = useState(new MyPostModel());
  const [userPosts, setUserPosts] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const url = `https://localhost:7142/api/UserPosts/${token}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        // Do something with the fetched data
        // console.log(data);
        setUserPosts([...data]);
        console.log(userPosts);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData(); // Call the API function
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://localhost:7142/api/UserPosts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Post request was successful
        console.log("Post created!");
        // Reset form values
        setMessage("Post Uploaded Successfully");
        fetchData();
      } else {
        // Handle error response
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Create"
        onClick={(e) => handleSubmit(e)}
        className="p-button-text"
      />
    </div>
  );

  return (
    <div className="postsPage">
      <div className="myFlex titleBar">
        <h1 style={{ textAlign: "center", marginTop: "70px" }}>Your Posts</h1>
        <Button
          label="Add"
          onClick={() => {
            setVisibleForm(true);
          }}
          icon="pi pi-plus"
          className="p-button-text"
          style={{ color: "black", marginTop: "70px" }}
        />
        <Dialog
          header="Create Post"
          visible={visisbleForm}
          onHide={() => {
            setVisibleForm(false);
            setFormData(new MyPostModel());
          }}
          footer={footerContent}
        >
          {message && <p>{message}</p>}
          <form className="form">
            <div className="p-field form-row">
              <label htmlFor="destination">Destination</label>
              <InputText
                id="destination"
                value={formData.destination}
                name="destination"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="p-field form-row">
              <label htmlFor="description">Description</label>
              <InputText
                id="description"
                value={formData.description}
                name="description"
                onChange={(e) => handleChange(e)}
                rows={5}
              />
            </div>

            <div className="form-row">
              <label htmlFor="rating">Rating</label>
              <Rating
                id="rating"
                cancel={false}
                name="rating"
                value={formData.rating}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </form>
        </Dialog>
      </div>
      <hr></hr>
      <div className="Posts">
        {userPosts &&
          userPosts.map((post) => (
            <Card
              title={
                <div className="cardTitle">
                  {post.destination}{" "}
                  <Button
                    icon="pi pi-trash"
                    className="trashButton"
                    //onClick={handleDelte(post.id)}
                  ></Button>
                </div>
              }
              subTitle={<Rating value={post.rating} cancel={false} />}
              className="postCard"
              key={post.id}
            >
              <p>{post.description}</p>
            </Card>
          ))}
      </div>
    </div>
  );
};

{
  /* <div className="p-field form-row">
              <label htmlFor="media">Media</label>
              <FileUpload
                id="media"
                mode="basic"
                multiple
                accept="image/*,video/*"
                maxFileSize={10000000} // 10MB
                customUpload
                uploadHandler={handleFileUpload}
              />
            </div> */
}

//const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleFileUpload = (event) => {
//     const files = event.files;
//     setSelectedFiles(files);
//     console.log(selectedFiles);
//   };
