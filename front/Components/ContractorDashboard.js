const { useState, useEffect } = require("react");
import axios from "axios";
import Project from "./Project";
import ProjectDropdown from "./ProjectDropdown";
import NavBar from "./NavBar";

function ContractorDashboard() {
  const [projects, setProjects] = useState([]);
  const [contractorId, setContractorId] = useState("");
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  async function getImage() {
    try {
      let temp = await axios.get(
        `http://localhost:3001/contractors/images${localStorage.getItem(
          "user"
        )}`
      );
      setLoading(false);
      return temp.data;
    } catch (e) {
      console.log(e);
    }
  }

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
      let holder = await getImage();
      let makeImage = new Image();
      makeImage.src = holder;
      //console.log(holder.images);
      setImage(makeImage.src);
      setLoading(false);
    }
    fetch();
  }, []);

  if (!loading)
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
          </div>
          {image && (
            <div>
              <p> Most Recent Project Photo: </p>
              <img
                className="card-image"
                src={image}
              ></img>
            </div>
          )}
          <h3>Projects:</h3>
          {projects.map((projectId) => (
            <ProjectDropdown
              projectId={projectId}
              key={projectId}
            />
          ))}
        </div>
      </div>
    );
}

export default ContractorDashboard;
