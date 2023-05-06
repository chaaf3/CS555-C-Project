const { useState, useEffect } = require("react");
import axios from "axios";
import Project from "./Project";
import ProjectDropdown from "./ProjectDropdown";
import NavBar from "./NavBar";
import NewProject from "./NewProject";

function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const id = localStorage.getItem("user");
      setUserId(id);
      console.log(id, userId);
      const { data } = await axios.get(`http://localhost:3001/users/${id}`);
      setUserData(data);
      console.log(data);
      setLoading(false);
    }
    fetch();
  }, []);

  useEffect(() => {}, []);
  if (loading) return <p>Loading ... </p>;
  return (
    <div>
      <div>
        <div>
          <header>Home Page</header>
          <NavBar />
          <h1>
            User with ID: {localStorage.getItem("user")} is created and logged
            in
          </h1>
          <NewProject />
        </div>
        <h3>Projects:</h3>
        {userData &&
          userData.project &&
          userData.project.map((projectId) => (
            <ProjectDropdown
              projectId={projectId}
              key={projectId}
            />
          ))}
      </div>
    </div>
  );
}

export default UserDashboard;
