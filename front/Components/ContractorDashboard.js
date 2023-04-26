const { useState, useEffect } = require("react");
import axios from "axios";
import Project from "./Project";
import ProjectDropdown from "./ProjectDropdown";

function ContractorDashboard() {
  const [projects, setProjects] = useState([]);
  const [contractorId, setContractorId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const id = localStorage.getItem("user");
      setContractorId(id);
      console.log(id, contractorId);
      const { data } = await axios.get(
        `http://localhost:3001/contractors/todo/${id}`
      );
      setProjects(data);
      console.log(data);
      setLoading(false);
    }
    fetch();
  }, []);
  if (!loading)
    return (
      <div>
        <h3>Projects:</h3>
        {projects.map((projectId) => (
          <ProjectDropdown projectId={projectId} key={projectId} />
        ))}
      </div>
    );
}

export default ContractorDashboard;
