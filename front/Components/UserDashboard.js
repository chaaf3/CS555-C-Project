const { useState, useEffect } = require("react");
import axios from "axios";
import Project from "./Project";

function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const id = await localStorage.getItem("user");
      setUserId(id);
      console.log(id, userId);
      const { data } = await axios.get(`http://localhost:3001/users/${userId}`);
      setUserData(data);
      console.log(data);
      setLoading(false);
    }
    fetch();
  }, []);

  useEffect(() => {}, []);
  if (!loading) return <Project id={userData.project} />;
}

export default UserDashboard;
