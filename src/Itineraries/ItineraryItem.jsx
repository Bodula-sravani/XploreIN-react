import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import "./ItineraryItem.css";
import { InputText } from "primereact/inputtext";
import { Button } from "@mui/material";

class UserItineraries {
  constructor() {
    this.id = 0;
    this.name = "string";
    this.description = "string";
    this.created_date = "2023-07-13T11:35:32.200Z";
    this.start_date = "2023-07-13T11:35:32.200Z";
    this.end_date = "2023-07-13T11:35:32.200Z";
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
      lockoutEnd: "2023-07-13T11:35:32.200Z",
      lockoutEnabled: true,
      accessFailedCount: 0,
    };
  }
}

export const ItineraryItem = () => {
  const { id } = useParams();
  const name = new URLSearchParams(window.location.search).get("name");

  const [itineraryItem, setItinerary] = useState([]);
  const [newTodo, setNewTodo] = useState([]);

  const getData = async () => {
    const token = localStorage.getItem("token");
    const url = `https://localhost:7142/api/ItineraryItems/${id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItinerary([...data]);
        console.log(data);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddTodo = (e, itinerary) => {
    e.preventDefault();
    const parsedTodos = JSON.parse(itinerary.todos);
    parsedTodos.push({
      action: newTodo[itinerary.id],
      completed: false,
    });
    const updatedItinerary = {
      ...itinerary,
      todos: JSON.stringify(parsedTodos),
      userItineraries: new UserItineraries(),
    };
    handleUpdateTodos(updatedItinerary);
  };

  const handleUpdateTodos = async (updatedItinerary) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://localhost:7142/api/ItineraryItems/${updatedItinerary.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItinerary),
        }
      );
      if (response.ok) {
        // Handle success message or any further actions
        getData();
        setNewTodo([]);
      } else {
        throw new Error("Failed to update todos");
      }
    } catch (error) {
      console.error("Error updating todos:", error);
    }
  };

  const handleToggleTodo = (e, index, itinerary) => {
    e.preventDefault();
    const newTodos = JSON.parse(itinerary.todos);
    newTodos[index].completed = !newTodos[index].completed;
    const updatedItinerary = {
      ...itinerary,
      todos: JSON.stringify(newTodos),
      userItineraries: new UserItineraries(),
    };
    handleUpdateTodos(updatedItinerary);
  };

  return (
    <>
      <h1 className="title" style={{ marginTop: "70px" }}>
        {name} Trip Planning
      </h1>
      <hr></hr>
      <div className="itemsFlex">
        {itineraryItem.map((itinerary) => (
          <Card
            key={itinerary.id}
            className="cardColor"
            title={
              <div>
                {/* <h2>{itinerary?.title}</h2>
              <p>{itinerary?.description}</p> */}
                <p>Plans on {itinerary?.date.split("T")[0]}</p>
              </div>
            }
          >
            <div>
              <div className="todos">
                <form onSubmit={(e) => handleAddTodo(e, itinerary)}>
                  <InputText
                    type="text"
                    value={newTodo[itinerary.id]}
                    onChange={(e) => {
                      const newTodosForItem = [...newTodo];
                      newTodosForItem[itinerary.id] = e.target.value;
                      setNewTodo(newTodosForItem);
                    }}
                  />

                  <Button type="submit">Add Todo</Button>
                </form>
                <p style={{ margin: "10px" }}>Todo List</p>
                {JSON.parse(itinerary.todos).map((todo, index) => (
                  <div key={index} className="todo-item">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={(e) => handleToggleTodo(e, index, itinerary)}
                      className="p-checkbox"
                    />
                    <label
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.action}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};
