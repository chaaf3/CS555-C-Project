const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const projects = mongoCollections.projects;
const contractorData = require("./contractors");
var nodemailer = require("nodemailer");
const validation = require("../validation");

const createProject = async (dueDate) => {
  validation.checkForValue(dueDate);
  
  const projectCollection = await projects();
  let newProject = {
    dueDate: dueDate,
    reminderDate: null,
    reminderSent: false,
    
  };
  const insertInfo = await projectCollection.insertOne(newProject);
  if (insertInfo.insertedCount === 0) {
    throw "Could not add project";
  }
  const newId = insertInfo.insertedId;
  const project = await getProject(newId);
  return project;
};

const getProject = async (id) => {
  validation.checkId(id);

  const projectCollection = await projects();
  const project = await projectCollection.findOne({ _id: new ObjectId(id) });
  if (project === null) {
    throw "No project with that id found!";
  }
  project._id = project._id.toString();
  return project;
};

const setReminderDate = async (id) => {
  validation.checkId(id);

  let currentProject = await getProject(id);
  let projectDueDate = new Date(currentProject.dueDate);
  reminderTime = projectDueDate.setDate(projectDueDate.getDate() - 2);
  reminderTime = new Date(reminderTime);

  let setReminder = {
    reminderDate: reminderTime,
  };

  const projectCollection = await projects();
  const updatedInfo = await projectCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: setReminder }
  );

  // TODO: error check if update was successful
  // if (updatedInfo.lastErrorObject.n === 0) {
  //   throw 'Could not successfully set reminder date';
  // }
};

// team23pass@gmail.com
// Team23Pass!
const sendReminderEmail = async (projectId, contractorId) => {
  validation.checkId(projectId);
  validation.checkId(contractorId);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "team23pass@gmail.com",
      pass: "wjfrcepybkbsicml",
    },
  });

  contractor = await contractorData.getContractor(contractorId);
  contractorEmail = contractor.email;

  projectCollection = await projects();
  currentProject = await projectCollection.findOne({
    _id: new ObjectId(projectId),
  });

  var mailOptions = {
    from: "team23pass@gmail.com",
    to: contractorEmail,
    subject: "Reminder " + currentProject._id + ": Upcoming Project Due Date",
    text: "This is a reminder that your project is due in 2 days. Please remember to keep track of your project.",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    confirmEmailSent(projectId, error, info);
  });
};

const confirmEmailSent = async (projectId, error, info) => {
  emailSent = false;
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
    emailSent = true;
  }

  if (emailSent) {
    const projectCollection = await projects();
    const updatedInfo = await projectCollection.updateOne(
      { _id: new ObjectId(projectId) },
      { $set: { reminderSent: true } }
    );
  }
};
//this function will modify the project details by adding items to the equimentDelivered list 
// and equipmentNotDelivered list. ProjectID is the _id of the project that needs to be modified
//Items is an array of strings that need to be added to equipmentDelivered list after verifying that
// each item in items is part of equipmentNeeded for the project
const updateEquipmentDelivered = async (projectId, items) => 
{
  projectCollection = await projects();
  let currentProject = await projectCollection.findOne({_id: new ObjectId(projectId)})
  if (!currentProject) {
    throw `Project with ID ${projectId} not found`;
  }
  currentProject.equipmentDelivered.push(...items);

  // Determine the difference between equipmentNeeded and equipmentDelivered
  let equipmentNotDelivered = currentProject.equipmentNeeded.filter((equipment) => !currentProject.equipmentDelivered.includes(equipment));

  // Update the project with the new equipmentDelivered and equipmentNotDelivered arrays
  await projectCollection.updateOne({_id: new ObjectId(projectId)}, {
    $set: {
      equipmentDelivered: currentProject.equipmentDelivered,
      equipmentNotDelivered: equipmentNotDelivered
    }
  });

}


module.exports = {
  createProject,
  getProject,
  setReminderDate,
  sendReminderEmail,
  updateEquipmentDelivered
};