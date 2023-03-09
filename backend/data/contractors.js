const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");
const { ConnectionCheckedInEvent, StreamDescription } = require("mongodb");

async function getContractor(id) {
  // id is for the contractor
  // if (!id) {
  //   throw "add an id";
  // }
  // if (typeof id != "string") {
  //   throw "wrong input type";
  // }

  // Return the contractor given the id

  const contractorCollection = await contractors();
  const contractor = await contractorCollection.findOne({ _id: new ObjectId(id) });
  if (!contractor) {
    throw "no contractor with that id";
  }
  return contractor;
}

async function getTasks(contractor) {
  if (!contractor) {
    throw "add a value";
  }
  let todos = contractor.todo;
  let builder = [];
  for (let i = 0; i < todos.length; i++) {
    for (let j = 0; j < todos[i].tasks.length; j++) {
      builder.push(todos[i].tasks[j]);
    }
  }
  return builder;
}

async function getMessages(contractor) {
  if (!contractor) {
    throw "add a value";
  }

  let messages = contractor.messages;
  let builder = [];
  for (let i = 0; i < messages.length; i++) {
    builder.push(messages[i].text);
  }
  return builder;
}

async function createContractor(name, email, messages, todo, calender) {
  const contractorCollection = await contractors();
  id = new ObjectId();

  let newContractor = {
    _id: id,
    name: name,
    email: email,
    messages: messages,
    todo: todo,
    calender: calender,
  };

  const insertInfo = await contractorCollection.insertOne(newContractor);
  if (!insertInfo.acknowledged) {
    throw "please try adding again";
  }
  return newContractor;
}

const getQueue = async (contractorId) => {
  try {
    if (!contractorId) throw "You must provide an id";
    if (typeof contractorId != "string") throw "Id must be of type string";
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
    if (!contractorId) throw "You must provide an id";
    if (typeof contractorId != "string") throw "Id must be of type string";
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
  const contractorCollection = await contractors();
  await contractorCollection.updateOne(
    { _id: ObjectId(contractorId) },
    { $push: { queue: task } }
  );
  return true;
};

async function createContractor(name, email, messages, todo, calender) {
  const contractorCollection = await contractors();
  id = new ObjectId();

  let newContractor = {
    _id: id,
    name: name,
    email: email,
    messages: messages,
    todo: todo,
    calender: calender,
  };

  const insertInfo = await contractorCollection.insertOne(newContractor);
  return newContractor;
}

module.exports = {
  getContractor,
  getTasks,
  getMessages,
  createContractor,
};
