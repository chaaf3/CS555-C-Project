const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
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
const helloWorld = function helloWorld() 
{
  return "Hello World!";
};

module.exports = 
{
  helloWorld,
};
