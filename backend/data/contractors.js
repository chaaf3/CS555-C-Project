const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const contractors = mongoCollections.contractors;
const projects = mongoCollections.projects;
const projectApi = require("./projects");
const { ObjectId } = require("mongodb");
const validation = require("../validation");
const bcrypt = require("bcrypt");
const saltRounds = 16;

const createContractor = async function (name, email, password) {
  // Input validation
  validation.checkNumOfArgs(arguments, 3, 3);
  validation.checkIsProper(name, "string", "name");
  validation.checkIsProper(email, "string", "email");
  validation.checkIsProper(password, "string", "password");
  validation.checkPassword(password);

  // Trim whitespace
  name = name.trim();
  email = email.trim();

  // Get database
  const contractorCollection = await contractors();
  if (!contractorCollection)
    throw "Error: Could not find contractorCollection.";

  // Check if contractor already exists
  const contractor = await contractorCollection.findOne({ email: email });
  if (contractor) throw `Error: Contractor already exists with email ${email}.`;

  // Hash password
  const hash = await bcrypt.hash(password, saltRounds);
  if (!hash) throw `Error: Could not hash password.`;

  // Create entry
  let newContractor = {
    _id: new ObjectId(),
    name: name,
    email: email,
    password: hash,
    messages: [],
    todo: [],
    inProgress: "No task", // Refactor (possibly remove)
    image: "",
  };

  const insertInfo = await contractorCollection.insertOne(newContractor);
  if (!insertInfo.acknowledged) {
    throw "Could not add contractor";
  }
  return newContractor;
};

const checkContractor = async function (email, password) {
  validation.checkNumOfArgs(arguments, 2, 2);
  validation.checkIsProper(email, "string", "email");
  validation.checkIsProper(password, "string", "password");

  // Trim whitespace
  email = email.trim();
  password = password.trim();

  const contractorCollection = await contractors();
  if (!contractorCollection)
    throw "Error: Could not find contractorCollection.";
  const contractor = await contractorCollection.findOne({ email: email });

  if (!contractor) throw "Either the email or password is invalid.";

  const match = await bcrypt.compare(password, contractor.password);

  if (!match) throw "Either the email or password is invalid.";

  contractor._id = contractor._id.toString();

  return {
    _id: contractor._id,
    name: contractor.name,
    email: contractor.email,
    messages: contractor.messages,
    todo: contractor.todo,
    inProgress: contractor.inProgress,
  };
};

const getContractor = async (contractorId) => {
  validation.checkNumOfArgs(arguments, 1);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkId(contractorId);

  const contractorCollection = await contractors();
  if (!contractorCollection)
    throw "Error: Could not find contractorCollection.";

  const contractor = await contractorCollection.findOne({
    _id: new ObjectId(contractorId),
  });
  if (!contractor) throw "Error: Contractor not found.";

  contractor._id = contractor._id.toString();
  return contractor;
};

const getMessages = async function (contractorId) {
  validation.checkNumOfArgs(arguments, 1);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkId(contractorId);

  const contractor = await getContractor(contractorId);
  return contractor.messages;
};

const addMessage = async function (contractorId, messageInfo) {
  validation.checkNumOfArgs(arguments, 2);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkIsProper(messageInfo, "object", "message");
  validation.checkId(contractorId);

  const contractorCollection = await contractors();
  if (!contractorCollection)
    throw "Error: Could not find contractorCollection.";

  const updatedInfo = await contractorCollection.updateOne(
    { _id: new ObjectId(contractorId) },
    { $push: { messages: messageInfo } }
  );

  if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount)
    throw "Error: Could not add message.";

  return await getMessages(contractorId);
};

const getProjectsToDo = async function (contractorId) {
  validation.checkNumOfArgs(arguments, 1);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkId(contractorId);

  const contractor = await getContractor(contractorId);
  return contractor.todo;
};

const addProjectToDo = async function (contractorId, projectId) {
  validation.checkNumOfArgs(arguments, 2);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkIsProper(projectId, "string", "projectId");
  validation.checkId(contractorId);
  validation.checkId(projectId);

  const contractorCollection = await contractors();
  if (!contractorCollection)
    throw "Error: Could not find contractorCollection.";

  const contractor = await contractorCollection.findOne({
    _id: new ObjectId(contractorId),
  });
  if (!contractor) throw "Error: Contractor not found.";

  const updatedContractor = await contractorCollection.updateOne(
    { _id: new ObjectId(contractorId) },
    { $push: { todo: projectId } }
  );

  if (!updatedContractor.matchedCount && !updatedContractor.modifiedCount) {
    throw "Update failed";
  }

  return await getContractor(contractorId);
};

// Refactor method
const getTaskInProgress = async function (contractorId, projectId) {
  validation.checkNumOfArgs(arguments, 2);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkIsProper(projectId, "string", "projectId");
  validation.checkId(contractorId);
  validation.checkId(projectId);

  const contractorCollection = await contractors();
  if (!contractorCollection)
    throw "Error: Could not find contractorCollection.";
  const contractor = await getContractor(contractorId);
  if (!contractor) throw "Error: Contractor not found.";

  for (i = 0; i < contractor.todo.length; i++) {
    if (contractor.todo[i] == projectId) {
      const currentProject = await projectApi.getProject(projectId);
      await contractorCollection.updateOne(
        { _id: new ObjectId(contractorId) },
        { $set: { inProgress: currentProject.inProgress } }
      );
      return currentProject.inProgress;
    } else {
      throw "Contractor is not working on this project.";
    }
  }
};

const startNextTaskInQueue = async function (contractorId, projectId) {
  validation.checkNumOfArgs(arguments, 2);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkId(contractorId);
  validation.checkIsProper(projectId, "string", "projectId");
  validation.checkId(projectId);

  const contractor = await getContractor(contractorId);

  for (i = 0; i < contractor.todo.length; i++) {
    if (contractor.todo[i] == projectId) {
      await projectApi.updateTaskStatus(projectId);
      return contractor;
    } else {
      throw "Contractor is not working on this project.";
    }
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
  return image;
};

module.exports = {
  createContractor,
  checkContractor,
  getContractor,
  getMessages,
  addMessage,
  getProjectsToDo,
  addProjectToDo,
  getTaskInProgress,
  startNextTaskInQueue,
  addImage,
};
