// const mongoCollections = require("../config/mongoCollections");
// const users = mongoCollections.users;
// const projects = mongoCollections.projects;
// const contractors = mongoCollections.contractors;
// const { ObjectId } = require("mongodb");
import { ObjectId } from "mongodb";
import {projects} from '../config/mongoCollections.js';

const data = require(".");

/* 
Referennces for reminder feature:
Developer: Harshdeep Aujla 
CS 546 Lab 4 
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


/* this function will modify the project by adding two new fields.
first new field is reminderDate which is the date when the reminder needs to be sent out
second new field is reminderSent which is a boolean indicating if the reminder is sent yet or not
By default reminderSent is false since the reminder is just recreated. 
A different function will be used to send the reminder and update the reminderSent field
*/
const createReminder = async (projectId) =>
{
  if (!projectId) throw 'Missing projectID';
  if(typeof projectId !== 'string') throw `id must be a string`
  if (projectId.trim().length === 0) throw `id must not be an empty string`
  projectId = projectId.trim();
  if(!ObjectId.isValid(projectId)) throw `invalid object ID`
  
  let curProject = await get(id);
  
  let reminderTime =  Date(curProject['dueDate'].getTime())
  reminderTime.setDate(reminderTime.getDate() - 2); // setting the reminder date to be 2 days before the due date
  let addedReminder = 
  {
    ...curProject, // this will include all the existing keys in the project
    reminderDate: reminderTime,
    reminderSent: false 
  }

  const projectCollection = await projects();
    const updatedInfo = await projectCollection.findOneAndUpdate(
      {_id: new ObjectId(id)},
      {$set: addedReminder},
      {returnDocument: 'after'}
    );
    if (updatedInfo.lastErrorObject.n === 0) {
      throw 'could not add reminder successfully';
    } 

}

export 
{
  createReminder,

};
