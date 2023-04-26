import { useState, useEffect } from "react";
import axios from "axios";
function Project({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get(`http://localhost:3001/project/${id}`);
      setData(data);
    }
    fetch();
  }, []);

  return (
    data && (
      <div style={{ textAlign: "start", padding: 30 }}>
        <h1 style={{ textAlign: "center" }}>Project Information</h1>
        <h2>{data.title}</h2>
        <h4>{data.description}</h4>
        <div style={{ flex: 1, display: "inline" }}>
          <h4>Tasks: </h4>
          {data.tasksToDo.map((task) => (
            <p key={task}>{task}</p>
          ))}
        </div>

        <p>In Progress: {data.inProgress}</p>
        <p>Notes: </p>
        {data.notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
        <p>Due Date: {data.dueDate.toString()}</p>
        <p>Reminder Date: {data.reminderDate.toString()}</p>
        <p>Reminder Sent: {data.reminderSent}</p>
        <p>Equiment Required: </p>
        {data.equipmentRequired.map((eqpt) => (
          <p key={eqpt}>{eqpt}</p>
        ))}
        <p>Delivered Equipment: </p>
        {data.deliveredEquipment.map((eqpt) => (
          <p key={eqpt}>{eqpt}</p>
        ))}
        <p>Needed Equipment:</p>
        {data.neededEquipment.map((eqpt) => (
          <p key={eqpt}>{eqpt}</p>
        ))}
        <h3>Contract:</h3>
        <p>id: {data.contract._id}</p>
        <p>Bank Approval? {data.contract.bankApproval.toString()}</p>
        <p>Date of Bank Approval: {data.contract.dateBankApproval}</p>
        <p>Utility Approval? {data.contract.utilityApproval.toString()}</p>
        <p>Date of Utility Approval: {data.contract.dateUtilityApproval}</p>
        <p>Approved? {data.contract.approved.toString()}</p>
        <p>Date Approved: {data.contract.utilityApproval}</p>
      </div>
    )
  );
}

export default Project;
