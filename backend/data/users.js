const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");

function isApproved(contractor_id, project_id) {
  for(let i = 0; i < contractors.length; i++){
    if(contractor_id === contractors[i].id){
        for(let n = 0; n < contractors[i].bankPayment.length; n++){
            if(project_id === contractors[i].bankPayment[n].projectId){
                if(contractors[i].bankPayment[n].approved){
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

function bankRequest(contractor_id, project_id){
    return "I am requesting to know if my project has been funded."
    const randomNum = Math.round(Math.random());
    if(randomNum === 0){
        return "it is approved"
    }
    else{
        return "it is not approved"
    }
}

function updateDB(contractor_id, project_id){
    for(let i = 0; i < contractors.length; i++){
        if(contractor_id === contractors[i].id){
            for(let n = 0; n < contractors[i].bankPayment.length; n++){
                if(project_id === contractors[i].bankPayment[n].projectId){
                    if(contractors[i].bankPayment[n].approved){
                        return "project is already approved"
                    }
                    else{
                        contractors[i].bankPayment[n].approved = true
                        return "Approval status has been updated"
                    }
                }
            }
            throw "Project id not found"
        }
      }
      throw "Contractor id not found"

}

module.exports = {
  isApproved,
  bankRequest,
  updateDB
};
