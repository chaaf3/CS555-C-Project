const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const validation = require("../validation");
const { ConnectionCheckedInEvent, StreamDescription } = require("mongodb");

async function getBankApproval() {
  let newBank = {
    id: new ObjectId(),
    approved: approval,
  };
  return newBank;
}

async function getContractor(id) {
  validation.checkId(id);

  const contractorCollection = await contractors();
  const contractor = await contractorCollection.findOne({
    _id: new ObjectId(id),
  });
  if (!contractor) {
    throw "No contractor found with the given id";
  }
  return contractor;
}

async function getTasks(contractor) {
  validation.checkForValue(contractor);

  let tasksToDo = contractor.todo;
  let builder = [];
  for (let i = 0; i < tasksToDo.length; i++) {
    for (let j = 0; j < tasksToDo[i].tasks.length; j++) {
      builder.push(tasksToDo[i].tasks[j]);
    }
  }
  return builder;
}

async function getMessages(contractor) {
  validation.checkForValue(contractor);

  let messages = contractor.messages;
  let builder = [];
  for (let i = 0; i < messages.length; i++) {
    builder.push(messages[i].text);
  }
  return builder;
}

async function createContractor(
  name,
  email,
  messages,
  todo,
  calendar,
  bankPayment
) {
  validation.checkForValue(name);
  validation.checkForValue(email);

  const contractorCollection = await contractors();

  let newContractor = {
    _id: new ObjectId(),
    name: name,
    email: email,
    messages: messages,
    todo: todo,
    calendar: calendar,
    bankPayment: bankPayment,
  };

  const insertInfo = await contractorCollection.insertOne(newContractor);
  if (!insertInfo.acknowledged) {
    throw "Could not add contractor";
  }
  return newContractor;
}

const getQueue = async (contractorId) => {
  try {
    validation.checkId(contractorId);

    const contractorCollection = await contractors();
    const contractor = await contractorCollection.findOne({
      _id: new ObjectId(contractorId),
    });

    if (!contractor) throw "Contractor not found";

    console.log("Queue: ", contractor.queue);
    return contractor.queue;
  } catch (e) {
    throw e;
  }
};

const getInProgress = async (contractorId) => {
  try {
    validation.checkId(contractorId);

    const contractorCollection = await contractors();
    const contractor = await contractorCollection.findOne({
      _id: new ObjectId(contractorId),
    });

    if (!contractor) throw "Contractor not found";

    if (Object.keys(contractor.inProgress).length == 0)
      console.log("In Progress: ", "No task");
    else console.log("In Progress: ", contractor.inProgress);
    return contractor.inProgress;
  } catch (e) {
    throw e;
  }
};

const startNextTaskInQueue = async (contractorId) => {
  validation.checkId(contractorId);

  const contractorCollection = await contractors();
  const contractor = await contractorCollection.findOne({
    _id: new ObjectId(contractorId),
  });

  const queue = contractor.queue;
  if (queue.length == 0) {
    console.log("Empty queue!");
    throw "Empty queue!";
  }

  const task = contractor.queue[0];
  await contractorCollection.updateOne(
    { _id: new ObjectId(contractorId) },
    { $pop: { queue: -1 } }
  );
  await contractorCollection.updateOne(
    { _id: new ObjectId(contractorId) },
    { $set: { inProgress: task } }
  );

  const newContractor = await contractorCollection.findOne({
    _id: new ObjectId(contractorId),
  });

  console.log("In Progress: ", newContractor.inProgress);
  console.log("Queue: ", newContractor.queue);
  return true;
};

const addToInQueue = async (contractorId, task) => {
  validation.checkId(contractorId);
  validation.checkForValue(task);

  const contractorCollection = await contractors();
  await contractorCollection.updateOne(
    { _id: ObjectId(contractorId) },
    { $push: { queue: task } }
  );
  return true;
};

async function isApproved(contractor_id, project_id) {
  validation.checkId(contractor_id);
  validation.checkId(project_id);

  let contractor = await getContractor(contractor_id);

  for (let i = 0; i < contractor.bankPayment.length; i++) {
    if (project_id === contractor.bankPayment[i].projectId) {
      if (contractor.bankPayment[i].approved) {
        return true;
      } else {
        return false;
      }
    }
  }
  throw "Project id not found";
}

function bankRequest(contractor_id, project_id) {
  validation.checkId(contractor_id);
  validation.checkId(project_id);

  console.log("I am requesting bank approval for my project.");
  const randomNum = Math.random();
  if (randomNum === 0) {
    console.log("The bank has not approved this project.");
    return false;
  } else {
    console.log("The bank approves this request!");
    return true;
  }
}

async function updateApproval(contractor_id, project_id) {
  validation.checkId(contractor_id);
  validation.checkId(project_id);

  let contractor = await getContractor(contractor_id);
  let bankBuilder = contractor.bankPayment;

  for (let i = 0; i < bankBuilder.length; i++) {
    if (project_id === bankBuilder[i].projectId) {
      if (bankBuilder[i].approved) {
        return "Already approved";
      } else {
        if (bankRequest(contractor_id, project_id)) {
          bankBuilder[i].approved = true;
        } else {
          return "The bank did not approve your request";
        }
      }
    }
  }

  contractor.bankPayment = bankBuilder;
  const contractorCollection = await contractors();
  await contractorCollection.updateOne(
    { _id: new ObjectId(contractor_id) },
    { $set: contractor }
  );
  return contractor;
}

module.exports = {
  getContractor,
  getTasks,
  getMessages,
  createContractor,
  isApproved,
  updateApproval,
  bankRequest,
};
