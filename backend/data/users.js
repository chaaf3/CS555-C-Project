const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");

async function isApproved(contractor_id, project_id) {
  let contractor = await getContractor(contractor_id);

  for (let i = 0; i < contractor.bankPayment.length; i++) {
    if (project_id === contractor.bankPayment[i].projectId) {
      if (contractor.bankPayment[i].approved) {
        return true;
      } else {
        return false;
      }
    }
  }
  throw "Project id not found";
}

function bankRequest(contractor_id, project_id) {
  console.log("I am requesting bank approval for my project.");
  const randomNum = Math.random();
  if (randomNum === 0) {
    console.log("The bank has not approved this project.");
    return false;
  } else {
    console.log("The bank approves this request!");
    return true;
  }
}

async function updateApproval(contractor_id, project_id) {
  let contractor = await getContractor(contractor_id);
  let replacement = contractor.bankPayment;
  for (let i = 0; i < contractor.bankPayment.length; i++) {
    if (project_id === contractor.bankPayment[i].projectId) {
      if (contractor.bankPayment[i].approved) {
        return "already approved";
      } else {
        contractor.bankPayment[i].approved = true;
        const contractorCollection = await contractors();
        await contractors.findOneAndReplace({
          _id: contractor._id,
          contractor,
        });
      }
    }
  }
  throw "Project id not found";
}

module.exports = {
  isApproved,
  bankRequest,
};

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
Contractor:
    {
    id: lksdjf;kiuhiasurhgojasd;ufh,
    name: James something,
    email: jamesSomething@gmail.com,
    messages: [{from: (sender uuid), text: "this is a message from a friend"}],
    tasks: [{projectId: alslksdjfoidifjpiuahjse, tasks:["This is a task in text", 'this is another text task']}],
    calender: [{projectId: kajsdhfgiubiea, DateTime: DateTimeObjectInstance}],
    bankPayment: [{projectId: kajsdhfgiubiea, approved: true}],
    }
    data folder:
        users
        projects
        contractors
    ToDo:
    Contractor Document
}
*/
