import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import UserDashboard from "./UserDashboard";
import ContractorDashboard from "./ContractorDashboard";

const NewProject = () => {
  const [title, setTitle] = useState({ title: undefined });
  const [description, setDescription] = useState({ password: undefined });
  const [dueDate, setDueDate] = useState({ name: undefined });
  const [local, setLocal] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLocal(localStorage.getItem("user"));
    }
  }, []);

  return (
    <div className="card">
      <h1>New Project</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await axios.post("http://localhost:3001/users/newProject", {
              values: {
                title: title,
                description: description,
                dueDate: dueDate,
                userId: localStorage.getItem("user"),
              },
            });
            alert("Project Created");
          } catch (e) {
            setError(e.response.data.error);
            throw "bad inputs";
          }
        }}
      >
        <label>Title:</label>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
            console.log(title);
          }}
          id="title"
          placeholder="title"
          value={title.title}
          name="title"
        />
        <label>Description:</label>
        <input
          onChange={(e) => {
            setDescription(e.target.value);
            console.log(description);
          }}
          id="description"
          placeholder="description"
          value={description.description}
          name="description"
        />
        <label>DueDate:</label>
        <input
          onChange={(e) => {
            setDueDate(e.target.value);
            console.log(dueDate);
          }}
          id="dueDate"
          type="date"
          placeholder="dueDate"
          value={dueDate.dueDate}
        />

        <input type="submit" />
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default NewProject;
