// const mongoCollections = require("../config/mongoCollections");
// const users = mongoCollections.users;
// const projects = mongoCollections.projects;
// const contractors = mongoCollections.contractors;
// const { ObjectId } = require("mongodb");
import { ObjectId } from "mongodb";
import {projects} from '../config/mongoCollections.js';

const data = require(".");
//
/* 
Referennces for reminder feature:
Developer: Harshdeep Aujla 
https://github.com/ericmahare/doctor_appointment_backend
https://stackoverflow.com/questions/51065938/react-js-redux-making-reminder-app
https://www.youtube.com/watch?v=VThjz_Vy450
https://www.linkedin.com/learning/paths/explore-react-js-development?u=56742337
https://www.linkedin.com/learning/react-js-essential-training-2020/building-modern-user-interfaces-with-react?autoplay=true&u=56742337

*/

const get = async (id) => 
{
  if (!id)
  {
    throw `Must pass an id`
  }
  if(typeof id !== 'string') 
  {
    throw `id must be a string`
  }
  if (id.trim().length === 0) 
  {
    throw `id must not be an empty string`
  }
  id = id.trim();
  if(!ObjectId.isValid(id)) 
  {
    throw `invalid object ID`
  }
  const projectCollection = await projects();
  const project = await projectCollection.findOne({_id: new ObjectId(id)});
  if (project === null) 
  {
    throw 'No project with that id found!';
  }
  project._id = project._id.toString();
  return project;
};



const createReminder = async (projectId) =>
{
  if (!projectId) throw 'Missing projectID';
  if(typeof projectId !== 'string') throw `id must be a string`
  if (projectId.trim().length === 0) throw `id must not be an empty string`
  projectId = projectId.trim();
  if(!ObjectId.isValid(projectId)) throw `invalid object ID`
  
  let curProject = await get(id);
  // basically using same logic I used for rename band. 
 // REMEMBER TO ADD ALL THE KEYS OF PROJECT BACK IN HERE OR ELSE PROJECT WILL BE MISSING INFORMATION
 //FOR THIS SPRINT ONLY GOING TO USE ID, DUE DATE, REMINDER DATE, AND REMINDER_SENT
  let addedReminder = 
  {

  }

}

module.exports = 
{
  helloWorld,
};
