import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./Itinerary.css";
import { Loader1 } from "../Components/Loader/Loader1";

class MyItineraryModel {
  constructor() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.created_date = new Date().toISOString().split("T")[0];
    this.start_date = new Date().toISOString();
    this.end_date = new Date().toISOString();
    this.userId = "";
    this.user = {
      id: "",
      userName: "",
      normalizedUserName: "",
      email: "",
      normalizedEmail: "",
      emailConfirmed: true,
      passwordHash: "",
      securityStamp: "",
      concurrencyStamp: "",
      phoneNumber: "",
      phoneNumberConfirmed: true,
      twoFactorEnabled: true,
      lockoutEnd: new Date().toISOString(),
      lockoutEnabled: true,
      accessFailedCount: 0,
    };
  }
}

export const Itinerary = () => {
  const [visibleCreateForm, setVisibleCreateForm] = useState(false);
  const [formData, setFormData] = useState(new MyItineraryModel());
  const [visibleUpdateForm, setVisibleUpdateForm] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [itineraryData, setItineraryData] = useState(null);
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");

  const footerContentCreate = (
    <div>
      <Button
        label="Create"
        onClick={() => handleCreate()}
        className="p-button-text"
      />
    </div>
  );

  const footerContentUpdate = (
    <div>
      <Button
        label="Edit"
        onClick={() => handleEdit()}
        className="p-button-text"
      />
    </div>
  );

  const renderDialog = (header, footer, visible, setVisible) => {
    return (
      <Dialog
        header={header}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          setVisible(false),
            setMessage(""),
            setFormData(new MyItineraryModel());
          setNameError("");
        }}
        footer={footer}
      >
        {message && <p>{message}</p>}
        {nameError && <p>{nameError}</p>}
        <form className="form">
          <div className="form-row">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Let's give it a crazy name"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              placeholder="Describe it..."
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="start_date">Start Date:</label>
            <input
              type="datetime-local"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              placeholder="Start date"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="end_date">End Date:</label>
            <input
              type="datetime-local"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              placeholder="End date"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
        </form>
      </Dialog>
    );
  };

  const handleGetItinerary = async () => {
    const token = localStorage.getItem("token");
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
        setItineraryData([...data]);
        console.log(data);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetItinerary();
  }, []);

  const handlePostItinerary = async (ItineraryModel) => {
    const url = "https://localhost:7142/api/UserItineraries";
    const token = localStorage.getItem("token");

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
        setMessage("Created Successfully");
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
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
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
        setMessage("Updated Successfully");
        handleGetItinerary();
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreate = () => {
    console.log(formData);
    if (formData.name.trim() === "") {
      setNameError("Name is required");
    } else {
      // Submit the form or perform any other action
      setNameError("");
    }
    handlePostItinerary(formData);
  };

  const handleEdit = () => {
    console.log(formData);
    handleUpdateItinrary(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateClick = async (id) => {
    const url = `https://localhost:7142/api/UserItineraries/${id}`;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(data);
        // console.log("fetced by id");
        // console.log(data);
        setVisibleUpdateForm(true);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="itineraryPage">
      <div className="myFlex titleBar">
        <h1 style={{ textAlign: "center", marginTop: "70px" }}>Your Trips</h1>
        <Button
          label="Add"
          onClick={() => {
            setVisibleCreateForm(true);
          }}
          icon="pi pi-plus"
          className="p-button-text"
          style={{ color: "black", marginTop: "70px" }}
        />
        {renderDialog(
          "Lets plan for another TRIP....🎉",
          footerContentCreate,
          visibleCreateForm,
          setVisibleCreateForm
        )}
      </div>
      <hr></hr>
      {itineraryData && itineraryData.length === 0 && (
        <p>No itinerary data available.</p>
      )}
      <div className="myFlex">
        {!itineraryData && <Loader1 />}
        {itineraryData &&
          itineraryData.map((d) => (
            <div
              key={d.id}
              className="card flex justify-content-center myFlexItem"
            >
              <Card
                title={d.name}
                subTitle={
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: "normal" }}>
                      <strong>Start: </strong>
                      {d.start_date.split("T")[0]}
                    </p>
                    <p style={{ fontSize: "15px", fontWeight: "normal" }}>
                      <strong>End: </strong>
                      {d.end_date.split("T")[0]}
                    </p>
                  </div>
                }
                header={
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <img
                      alt="Card"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCWOMrdSF3wCnuLdx9v-Elps8-3mbwvpffHg&usqp=CAU"
                      //src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROX4_-iyyv0Mg0mxUhZHbFbzBf1INoSSJp9yAJbwvapKimRs5Kc0mELQJoAGf4eJaqRTk&usqp=CAU"
                      //src="https://st5.depositphotos.com/1359043/64614/v/600/depositphotos_646140092-stock-illustration-abstract-plane-hand-line-drawing.jpg"
                      style={{
                        height: "100px",
                        width: "300px",
                        borderRadius: "5px",
                      }}
                    />
                    {/* <hr /> */}
                    <Button
                      label=""
                      icon="pi pi-trash"
                      onClick={() => setVisibleDelete(true)}
                      className="p-button-text"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        margin: "5px",
                        color: "black",
                      }}
                    />
                    <Button
                      label=""
                      icon="pi pi-pencil"
                      onClick={() => handleUpdateClick(d.id)}
                      className="p-button-text"
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        margin: "5px",
                        color: "black",
                      }}
                    />
                  </div>
                }
                className="md:w-25rem"
                style={{ height: "300px", width: "300px" }}
              >
                <Dialog
                  header="Confirm Delete?"
                  visible={visibleDelete}
                  style={{ width: "50vw" }}
                  onHide={() => setVisibleDelete(false)}
                >
                  <Button
                    label="Yes"
                    onClick={() => {
                      handleDeleteItinrary(d.id), setVisibleDelete(false);
                    }}
                    className="p-button-danger"
                  />
                  {/* <Button
                  label="No"
                  onClick={() => setVisibleDelete(false)}
                  className="p-button-warning"
                  icon="pi pi-wrong"
                /> */}
                </Dialog>

                {renderDialog(
                  "Edit",
                  footerContentUpdate,
                  visibleUpdateForm,
                  setVisibleUpdateForm
                )}
                <p>{d.description}</p>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};
