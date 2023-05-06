import { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import Link from "next/link";
import axios from "axios";

function EnergyBill() {
  const [projects, setProjects] = useState([]);

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const id = localStorage.getItem("user");
      setUserId(id);
      console.log(id, userId);
      let res;
      if (localStorage.getItem("type") == "contractor") {
        res = await axios.get(`http://localhost:3001/contractors/todo/${id}`);
        let a = [];
        await res.data.forEach(async (projectId) => {
          const { data } = await axios.get(
            `http://localhost:3001/project/${projectId}`
          );
          console.log(data);
          a.push(data);
          console.log(a);
          setProjects(a);
        });
      } else {
        res = await axios.get(`http://localhost:3001/users/${id}`);
        const { data } = await axios.get(
          `http://localhost:3001/project/${res.data.project}`
        );
        const a = [data];
        setProjects(a);
        console.log(a);
      }
      setLoading(false);
    }
    fetch();
  }, []);
  if (!loading)
    if (loading) return <p>Loading...</p>;
    else
      return (
        <div>
          <header>Energy Bill</header>
          <nav class="nav-bar">
            <Link
              href="Auth"
              class="page-link"
            >
              Home
            </Link>
            <Link
              href="Calendar"
              class="page-link"
            >
              Calendar
            </Link>
            <Link
              href="EnergyBill"
              class="page-link"
            >
              Billing
            </Link>
            <Link
              href="ImageHandler"
              class="page-link"
            >
              Upload Image
            </Link>
          </nav>{" "}
          {projects.map((proj) => (
            <Paper
              elevation={3}
              sx={{ width: "50%", textAlign: "center" }}
            >
              <h3>Bill for Project "{proj.title}" Details:</h3>
              <p>Project Description: {proj.description}</p>
              <p>Balance: ${proj.balance}</p>
              <p>Date: {proj.dueDate}</p>
            </Paper>
          ))}
          {/* <Paper elevation={3} sx={{ width: "50%", textAlign: "center" }}>
          <h3>Bill for Details:</h3>
          <p>Balance: ${data.balance}</p>
          <p>Energy Used: {data.energyUsed}</p>
          <p>Date: {data.date.toString()}</p>
          <p>Notes: {data.notes}</p>
        </Paper> */}
        </div>
      );
}

export default EnergyBill;
