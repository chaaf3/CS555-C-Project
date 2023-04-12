import { useState, useEffect } from "react";

function Project() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetch() {
      const dummyData = {
        title: "Sample Title",
        description: "Sample Description",
        tasksToDo: ["task 1", "task2", "task3"],
        inProgress: null,
        notes: [],
        dueDate: new Date(),
        reminderDate: new Date(),
        reminderSent: false,
        equipmentRequired: [],
        deliveredEquipment: [],
        neededEquipment: [],
        contract: {
          _id: 123,
          bankApproval: false,
          dateBankApproval: null,
          utilityApproval: false,
          dateUtilityApproval: null,
          approved: false,
          dateApproved: null,
        },
      };
      setData(dummyData);
    }
    fetch();
  }, []);

  return (
    data && (
      <div style={{ textAlign: "start", padding: 30 }}>
        <h1 style={{ textAlign: "center" }}>Project Information</h1>
        <h2>{data.title}</h2>
        <h6>{data.description}</h6>
        <div style={{ flex: 1, display: "inline" }}>
          <p>Tasks: </p>
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
        <p>Bank Approval? {data.contract.bankApproval}</p>
        <p>Date of Bank Approval: {data.contract.dateBankApproval}</p>
        <p>Utility Approval? {data.contract.utilityApproval}</p>
        <p>Date of Utility Approval: {data.contract.dateUtilityApproval}</p>
        <p>Approved? {data.contract.approved}</p>
        <p>Date Approved: {data.contract.utilityApproval}</p>
      </div>
    )
  );
}

export default Project;
