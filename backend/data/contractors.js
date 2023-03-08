const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");

const helloWorld = function helloWorld() {
  console.log("Hello world");
};

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
  return newContractor;
}

module.exports = {
  helloWorld,
  createContractor,
};
