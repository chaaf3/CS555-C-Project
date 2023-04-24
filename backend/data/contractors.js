const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const validation = require("../validation");

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
    inProgress: "No task",
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

const getToDo = async function (contractorId) {
  validation.checkNumOfArgs(arguments, 1);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkId(contractorId);

  const contractor = await getContractor(contractorId);
  return contractor.todo;
};

const getInProgress = async function (contractorId) {
  validation.checkNumOfArgs(arguments, 1);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkId(contractorId);

  const contractor = await getContractor(contractorId);
  return contractor.inProgress;
};

const startNextTaskInQueue = async function (contractorId, projectId) {
  validation.checkNumOfArgs(arguments, 2);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkId(contractorId);
  validation.checkIsProper(projectId, "string", "projectId");
  validation.checkId(projectId);

  const contractor = await getContractor(contractorId);

  const todo = contractor.todo;
  let target;
  for (let project of todo) {
    if (project.projectId == projectId) {
      target = project;
    }
  }
  if (!target) {
    throw `Error: No project found with the given id ${projectId}.`;
  }
  if (target.tasks.length == 0) {
    throw "No more tasks in queue.";
  }

  const task = target.tasks[0];
  target.tasks = target.tasks.slice(1);

  for (let i = 0; i < todo.length; i++) {
    if (todo[i].projectId == projectId) {
      todo[i] = target;
    }
  }

  const contractorCollection = await contractors();
  const updated = await contractorCollection.updateOne(
    { _id: new ObjectId(contractorId) },
    { $set: {todo: todo, inProgress: task } }
  );
  if (!updated.acknowledged) {
    throw "Mongo Error: Could not set next task.";
  }

  const newContractor = await getContractor(contractorId);

  return await getContractor(contractorId);
};

const addTaskToQueue = async function (contractorId, projectId, task) {
  validation.checkNumOfArgs(arguments, 3);
  validation.checkIsProper(contractorId, "string", "contractorId");
  validation.checkId(contractorId);
  validation.checkIsProper(projectId, "string", "projectId");
  validation.checkId(projectId);
  validation.checkForValue(task);

  const contractor = await getContractor(contractorId);

  const todo = contractor.todo;
  let target;
  for (let project of todo) {
    if (project.projectId == projectId) {
      target = project;
    }
  }
  if (!target) {
    throw `Error: No project found with the given id ${projectId}.`;
  }

  target.tasks.push(task);

  for (let i = 0; i < todo.length; i++) {
    if (todo[i].projectId == projectId) {
      todo[i] = target;
    }
  }

  const contractorCollection = await contractors();
  const updated = await contractorCollection.updateOne(
    { _id: new ObjectId(contractorId) },
    { $set: {todo: todo} }
  );
  if (!updated.acknowledged) {
    throw "Mongo Error: Could not add task to queue.";
  }
  return await getContractor(contractorId);
};

module.exports = {
  createContractor,
  getContractor,
  getMessages,
  getToDo,
  getInProgress,
  startNextTaskInQueue,
  addTaskToQueue
};
