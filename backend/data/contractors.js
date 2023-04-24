const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const validation = require("../validation");
const { ConnectionCheckedInEvent, StreamDescription } = require("mongodb");

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
const addImage = async (contractorId, image) => {
  console.log("made it here");
  try {
    let contractorCollection = await contractors();
    let updatedContractor = await contractorCollection.updateOne(
      { _id: new ObjectId(contractorId) },
      { $set: { image: image } }
    );
    if (!updatedContractor.matchedCount && !updatedContractor.modifiedCount) {
      throw "Update failed";
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
  return true;
};

const getInProgress = async (contractorId) => {
  try {
    validation.checkId(contractorId);

    const contractorCollection = await contractors();
    const contractor = await contractorCollection.findOne({
      _id: new ObjectId(contractorId),
    });

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

module.exports = {
  getContractor,
  getMessages,
  createContractor,
  addImage,
};
