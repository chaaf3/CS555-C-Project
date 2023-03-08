const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");

const helloWorld = function helloWorld() {
  console.log("Hello world");
};

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

module.exports = {
  helloWorld,
  getQueue,
  getInProgress,
  startNextTaskInQueue,
  addToInQueue,
};
