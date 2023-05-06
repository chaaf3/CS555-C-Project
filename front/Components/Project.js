import { useState, useEffect } from "react";
import axios from "axios";
function Project({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get(`http://localhost:3001/project/${id}`);
      setData(data);
    }
    if (id) {
      fetch();
    }
  }, [id]);

  return (
    data && (
      <div
        className="card"
        style={{ textAlign: "start", padding: 30 }}
      >
        <h1
          className="card-title"
          style={{ textAlign: "center" }}
        >
          Project Information
        </h1>
        <h2 className="card-title">Title: {data.title}</h2>
        <h4 className="card-text">Description: {data.description}</h4>
        {/* <div style={{ flex: 1, display: "inline" }}>
          <h4>Tasks: </h4>
          {data.tasksToDo.map((task) => (
            <p key={task}>{task}</p>
          ))}
        </div> */}

        <p className="card-text">
          In Progress:{" "}
          {(data && data.inProgress && data.inProgress) || "Initial Site Visit"}
        </p>
        <p className="card-text">Notes: </p>
        {(data &&
          data.notes &&
          data.notes.map((note) => <p key={note}>{note}</p>)) ||
          "No notes yet"}
        <p className="card-text">
          Due Date:{" "}
          {(data && data.dueDate && data.dueDate.toString()) || "22-22-2022"}
        </p>
        <p className="card-text">
          Reminder Date:{" "}
          {(data && data.reminderDate && data.reminderDate.toString()) ||
            "12-22-2022"}
        </p>
        <p className="card-text">
          Reminder Sent:{" "}
          {(data && data.setReminderDate && data.reminderSent) || true}
        </p>
        <p className="card-text">Equiment Required: </p>
        {data.equipmentRequired.map((eqpt) => (
          <p key={eqpt}>{eqpt}</p>
        ))}
        <p className="card-text">Delivered Equipment: </p>
        {data.deliveredEquipment.map((eqpt) => (
          <p key={eqpt}>{eqpt}</p>
        ))}
        <p className="card-text">Needed Equipment:</p>
        {data.neededEquipment.map((eqpt) => (
          <p key={eqpt}>{eqpt}</p>
        ))}
        <h3 className="card-title">Contract:</h3>
        <p className="card-text">id: {data.contract._id}</p>
        <p className="card-text">
          Bank Approval? {data.contract.bankApproval.toString()}
        </p>
        <p className="card-text">
          Date of Bank Approval: {data.contract.dateBankApproval}
        </p>
        <p className="card-text">
          Utility Approval? {data.contract.utilityApproval.toString()}
        </p>
        <p className="card-text">
          Date of Utility Approval: {data.contract.dateUtilityApproval}
        </p>
        <p className="card-text">
          Approved? {data.contract.approved.toString()}
        </p>
        <p className="card-text">
          Date Approved: {data.contract.utilityApproval}
        </p>
      </div>
    )
  );
}

export default Project;
