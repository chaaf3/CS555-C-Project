const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");


function BankRequest(contractor_id, project_id) {
  for(let i = 0; i < contractors.length; i++){
    if(contractor_id === contractors[i].id){
        for(let n = 0; n < contractors[i].BankPayment.length; n++){
            if(project_id === contractors[i].BankPayment[n].projectId){
                if(contractors[i].BankPayment[n].approved){
                    return true
                }
                else{
                    return false
                }
            }
        }
        throw "Project id not found"
    }
  }
  throw "Contractor id not found"

}


module.exports = {
  BankRequest
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
