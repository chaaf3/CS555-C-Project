const mongoCollections = require("../config/mongoCollections");

const { ObjectId } = require("mongodb");
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;

// team23pass@gmail.com
// Team23Pass!
const data = require(".");
var nodemailer = require('nodemailer');

const createProject = async (dueDate) => {
  const projectCollection = await projects();
  let newProject = {
    dueDate: dueDate,
    reminderDate: null,
    reminderSent: false
  }
  const insertInfo = await projectCollection.insertOne(newProject);
  if (insertInfo.insertedCount === 0) {
    throw 'Could not add project';
  }
  const newId = insertInfo.insertedId;
  const project = await getProject(newId);
  return project;
}

const getProject = async (id) => {
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
const createReminder = async (projectId) => {
  let curProject = await get(id);
  
  let reminderTime =  Date(curProject['dueDate'].getTime())
  reminderTime.setDate(reminderTime.getDate() - 2); // setting the reminder date to be 2 days before the due date
  let addedReminder = {
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

const sendReminderEmail = async (contractorId) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'team23pass@gmail.com',
      pass: 'Team23Pass!'
    }
  });

  let contractor = await data.contractors.getContractor(contractorId);
  let contractorEmail = contractor['email'];

  var mailOptions = {
    from: 'team23pass@gmail.com',
    to: contractorEmail,
    subject: 'Reminder: Project Due Date',
    text:
    'This is a reminder that your project is due in 2 days. Please remember to keep track of your project.'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  createProject,
  getProject,
  createReminder,
  sendReminderEmail
};