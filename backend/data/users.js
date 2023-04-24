const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");
const validation = require("../validation");
const bcrypt = require("bcrypt");
const saltRounds = 16;
const session = require("express-session");

const createUser = async function createUser(name, email, password) {
  // Input validation
  console.log(name, email, password);
  validation.checkNumOfArgs(arguments, 3, 3);
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
    messages: [],
    calendar: [],
    status: [],
  };

  // Insert entry
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw `Error: Could not add new user with email ${email}.`;

  // Return new user sans password
  return {
    _id: insertInfo.insertedId,
    name: name,
    email: email,
    messages: [],
    calendar: [],
    status: [],
  };
};

const checkUser = async function checkUserAccount(email, password) {
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

const addMessage = async (userId, message) => {};

// Messages and calendar code can be reused from contractors.js

module.exports = {
  createUser,
  checkUser,
  getUser,
  addMessage,
};
