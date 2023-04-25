const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const contractors = mongoCollections.contractors;
const projects = mongoCollections.projects;
const projectApi = require("./projects");
const { ObjectId } = require("mongodb");
const validation = require("../validation");
const { getProject } = require("./projects");

const createContractor = async function (name, email, messages, todo, calendar, bankPayment) {
  // console.log(arguments.length)
  validation.checkNumOfArgs(arguments, 6);
  validation.checkIsProper(name, "string", "name");
  validation.checkIsProper(email, "string", "email");
  validation.checkIsProper(messages, "object", "messages");
  validation.checkIsProper(todo, "object", "todo");
  validation.checkIsProper(calendar, "object", "calendar");
  validation.checkIsProper(bankPayment, "object", "bankPayment");

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

const getContractor = async function (contractorId) {
  validation.checkNumOfArgs(arguments, 1);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkId(contractorId);

  const contractorCollection = await contractors();
  const contractor = await contractorCollection.findOne({
    _id: new ObjectId(contractorId),
  });
  if (!contractor) {
    throw "No contractor found with the given id";
  }
  return contractor;
}

const getMessages = async function (contractorId) {
  validation.checkNumOfArgs(arguments, 1);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkId(contractorId);

  const contractor = await getContractor(contractorId);
  return contractor.messages;
}

const getProjectsToDo = async function (contractorId) {
  validation.checkNumOfArgs(arguments, 1);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkId(contractorId);

  const contractor = await getContractor(contractorId);
  return contractor.todo;
};

const getTaskInProgress = async function (contractorId, projectId) {
  validation.checkNumOfArgs(arguments, 2);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkIsProper(projectId, "string", "projectId");
  validation.checkId(contractorId);
  validation.checkId(projectId);

  const contractor = await getContractor(contractorId);

  for (i = 0; i < contractor.todo.length; i++) {
    if (contractor.todo[i] == projectId) {
     const currentProject = await getProject(projectId);
     return currentProject.inProgress;
    }
    else {
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
     projectApi.updateTaskStatus(projectId);
     return;
    }
    else {
      throw "Contractor is not working on this project.";
    }
  }
};

module.exports = {
  createContractor,
  getContractor,
  getMessages,
  getProjectsToDo,
  getTaskInProgress,
  startNextTaskInQueue,
};
