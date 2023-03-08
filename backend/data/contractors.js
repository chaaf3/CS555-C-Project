const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");
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

module.exports = {
  createContractor,
};

