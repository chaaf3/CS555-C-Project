const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");
const validation = require("../validation");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const session = require("express-session");

const createUser = async function createUser(name, email, password, balance) {
  // Input validation

  console.log(name, email, password);
  validation.checkNumOfArgs(arguments, 4, 4);
  validation.checkIsProper(name, "string", "name");
  validation.checkIsProper(email, "string", "email");
  validation.checkIsProper(password, "string", "password");
  validation.checkPassword(password);

  // Trim whitespace
  name = name.trim();
  email = email.trim();
  password = password.trim();

  // Get database
  const userCollection = await users();
  if (!userCollection) throw `Error: Could not find userCollection.`;

  // Check if user already exists
  const user = await userCollection.findOne({ email: email });
  if (user) throw `Error: User already exists with email ${email}.`;

  // Hash password
  const hash = await bcrypt.hash(password, saltRounds);
  if (!hash) throw `Error: Could not hash password.`;

  // Create entry
  let newUser = {
    name: name,
    email: email,
    password: hash,
    balance: balance,
    messages: [],
    calendar: [],
    status: [],
  };

  // Insert entry
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw `Error: Could not add new user with email ${email}.`;

  // let newUserId = insertInfo.insertedId.toString();
  // const currentNewUser = await getUser(newUserId);
  // return currentNewUser

  return newUser;
};

const checkUserAccount = async function checkUserAccount(email, password) {
  // Input validation
  validation.checkNumOfArgs(arguments, 2, 2);
  validation.checkIsProper(email, "string", "email");
  validation.checkIsProper(password, "string", "password");

  // Trim whitespace
  email = email.trim();
  password = password.trim();

  // Get database
  const userCollection = await users();
  if (!userCollection) throw `Error: Could not find userCollection.`;

  // Check if user exists
  const user = await userCollection.findOne({ email: email });
  if (!user) throw `Error: Either the email or password is invalid.`;

  // Check password
  const match = await bcrypt.compare(password, user.password);

  // Failure
  if (!match) throw `Error: Either the email or password is invalid.`;

  // Success
  user._id = user._id.toString();
  // Return new user sans password
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    messages: user.messages,
    calendar: user.calendar,
    status: user.status,
    project: user.project,
  };
};

const getUser = async (id) => {
  validation.checkId(id);

  const userCollection = await users();
  const user = await userCollection.findOne({ _id: new ObjectId(id) });
  if (user === null) {
    throw "No user with that id found";
  }
  user._id = user._id.toString();
  return user;
};

const addMessage = async (userId, message) => {
  validation.checkIsProper(message, "string", "message");
  validation.checkId(userId.toString());

  // Trim whitespace
  userId = userId.toString().trim();
  message = message.trim();

  const userCollection = await users();
  if (!userCollection) throw `Error: Could not find userCollection.`;

  const user = await userCollection.findOne({ _id: new ObjectId(userId) });
  if (user === null) {
    throw "No user with that id found";
  }

  await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $push: { messages: message } }
  );

  return user;
};

// Refactor (not necessary?)
const updateStatus = async (userId, projectId) => {
  validation.checkId(userId.toString());
  validation.checkId(projectId.toString());

  // Trim whitespace
  userId = userId.toString().trim();
  projectId = projectId.toString().trim();

  const projectCollection = await projects();
  if (!projectCollection) throw `Error: Could not find projectCollection.`;

  const project = await projectCollection.findOne({
    _id: new ObjectId(projectId),
  });
  if (project === null) {
    throw "No project with that id found";
  }

  const userCollection = await users();
  if (!userCollection) throw `Error: Could not find userCollection.`;

  await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $push: { status: project.inProgress } }
  );

  return project;
};

const getBalance = async (userId) => {
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: new ObjectId(userId) });
  if (user === null) {
    throw "No user with that id found";
  }

  return user.balance;
};

const payBill = async (userId, projectId) => {
  const projectCollection = await projects();
  currentProject = await projectCollection.findOne({
    _id: new ObjectId(projectId),
  });
  projectBalance = currentProject.balance;

  user = await getUser(userId);
  userBalance = user.balance;

  if (projectBalance > userBalance) {
    throw "Error: User does not have enough money to pay for this project";
  }
  if (projectBalance <= 0) {
    console.log(
      "There is no balance that needs to be paid! Your account is up to date!"
    );
    return;
  }

  userBalance -= projectBalance;

  const userCollection = await users();
  const updateUserBalance = await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { balance: userBalance } }
  );
  if (updateUserBalance.modifiedCount !== 1) {
    throw "Error: Could not update user balance successfully";
  }

  const updateProjectBalance = await projectCollection.updateOne(
    { _id: new ObjectId(projectId) },
    { $set: { balance: 0 } }
  );
  if (updateProjectBalance.modifiedCount !== 1) {
    throw "Error: Could not update project balance successfully";
  }

  console.log(
    "The bill was successfully paid! The remaining user balance is: " +
      userBalance
  );
};

const depositMoney = async (userId, amount) => {
  const userCollection = await users();
  user = await getUser(userId);
  userBalance = user.balance;

  userBalance += amount;

  const updateUserBalance = await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { balance: userBalance } }
  );
  if (updateUserBalance.modifiedCount !== 1) {
    throw "Error: Could not update user balance successfully";
  }
};

const getProject = async function (userId) {
  validation.checkNumOfArgs(arguments, 1);
  validation.checkIsProper(userId, "string", "contractorId");
  validation.checkId(userId);

  const contractor = await getUser(userId);
  return contractor.project;
};

const addProject = async function (userId, projectId) {
  validation.checkNumOfArgs(arguments, 2);
  validation.checkIsProper(userId, "string", "contractorId");
  validation.checkIsProper(projectId, "string", "projectId");
  validation.checkId(userId);
  validation.checkId(projectId);

  const userCollection = await users();
  if (!userCollection) throw "Error: Could not find contractorCollection.";

  const user = await userCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (!user) throw "Error: User not found.";

  const updatedUser = await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $push: { todo: projectId } }
  );

  if (!updatedUser.matchedCount && !updatedUser.modifiedCount) {
    throw "Update failed";
  }

  return await getUser(userId);
};

// Messages and calendar code can be reused from contractors.js

module.exports = {
  createUser,
  checkUserAccount,
  getUser,
  updateStatus,
  addMessage,
  getBalance,
  payBill,
  depositMoney,
  addProject,
  getProject,
};
