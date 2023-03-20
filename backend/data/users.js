const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");

/*
database Layout
User:
    {
    id: lksdjf;kiuhiasurhgojasd;ufh,
    name: James something,
    email: jamesSomething@gmail.com,
    messages: [{from: (sender uuid), text: "this is a message from a friend"}],
    calender: [{projectId: kajsdhfgiubiea, DateTime: DateTimeObjectInstance}],
    implementation: [{projectId: most recent step completed}]
    }
<<<<<<< HEAD
  }
  throw "Contractor id not found"
}

function bankRequest(contractor_id, project_id){
    return "I am requesting to know if my project has been funded."
    const randomNum = Math.round(Math.random());
    if(randomNum === 0){
        return "it is approved"
    }
    else{
        return "it is not approved"
=======
Contractor:
    {
    id: lksdjf;kiuhiasurhgojasd;ufh,
    name: James something,
    email: jamesSomething@gmail.com,
    messages: [{from: (sender uuid), text: "this is a message from a friend"}],
    tasks: [{projectId: alslksdjfoidifjpiuahjse, tasks:["This is a task in text", 'this is another text task']}],
    calender: [{projectId: kajsdhfgiubiea, DateTime: DateTimeObjectInstance}],
    bankPayment: [{projectId: kajsdhfgiubiea, approved: true}],
>>>>>>> f6c3ebf8e1f08d2815d688a9266d921dbe686591
    }
    data folder:
        users
        projects
        contractors
    ToDo:
    Contractor Document
}
*/
