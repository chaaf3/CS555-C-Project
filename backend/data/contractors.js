const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");
const { ConnectionCheckedInEvent, StreamDescription } = require("mongodb");

async function getContractor(id) {
  // id is for the contractor
  if (!id) {
    throw "add an id";
  }
  if (typeof id != "string") {
    throw "wrong input type";
  }
  const contractorCollection = await contractors();
  const contractor = await contractorCollection.findOne({
    _id: new ObjectId(id),
  });

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
  /*{
    id: lksdjf;kiuhiasurhgojasd;ufh,
    name: James something,
    email: jamesSomething@gmail.com,
    messages: [{from: (sender uuid), text: "this is a message from a friend"}],
    todo: [{projectId: alslksdjfoidifjpiuahjse, tasks:["This is a task in text", 'this is another text task']}],
    calender: [{projectId: kajsdhfgiubiea, DateTime: DateTimeObjectInstance}],
    bankPayment: [{projectId: kajsdhfgiubiea, approved: true}],
    }
    */
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
  getContractor,
  getTasks,
  getMessages,
  createContractor,
};
