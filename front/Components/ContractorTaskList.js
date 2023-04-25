import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";

function ContractorTaskList() {
  const [queue, setQueue] = useState([]);
  const contractorId = "123";

  useEffect(() => {
    async function fetch() {
      //   const { data } = await axios.get(
      //     `http://localhost:3000/contractors/queue/${contractorId}`
      //   );
      //   if (!data)
      const data = [
        {
          projectId: 123,
          tasks: ["Task 1", "Task 2", "Task 3"],
        },
        {
          projectId: 12345,
          tasks: ["Task 1", "Task 2", "Task 3"],
        },
      ];
      console.log(data);
      setQueue(data);
    }
    fetch();
  }, []);

  return (
    <div>
      <h3>Projects:</h3>
      {queue.map((task) => (
        <ProjectCard task={task} />
      ))}
    </div>
  );
}

export default ContractorTaskList;
