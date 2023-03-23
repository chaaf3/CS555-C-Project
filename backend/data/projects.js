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
    contract: {
      _id: new ObjectId(),
      approved: false,
      dateApproved: null
    }
  };
  const insertInfo = await projectCollection.insertOne(newProject);
  if (insertInfo.insertedCount === 0) {
    throw "Could not add project";
  }
  let newProjectId = insertInfo.insertedId.toString();
  const project = await getProject(newProjectId);
  return project;
};

const getProject = async (projectId) => {
  validation.checkId(projectId);

  const projectCollection = await projects();
  const project = await projectCollection.findOne({ _id: new ObjectId(projectId) });
  if (project === null) {
    throw "No project with that id found!";
  }
  project._id = project._id.toString();
  return project;
};

const getContract = async (projectId) => {
  validation.checkId(projectId);

  let currentProject = await getProject(projectId);
  if (!currentProject.contract) {
    throw "No contract found for this project";
  }
  const contract = currentProject.contract;
  contract._id = contract._id.toString();
  return contract;
}

const approveContract = async (projectId) => {
  validation.checkId(projectId);

  const projectCollection = await projects();
  const project = await projectCollection.findOne({ _id: new ObjectId(projectId) });
  if (project === null) {
    throw "No project with that id found!";
  }
  if (!project.contract) {
    throw "No contract found for this project";
  }
  project.contract.approved = true;
  project.contract.dateApproved = new Date();
  
  const updatedInfo = await projectCollection.updateOne({ _id: new ObjectId(projectId) }, { $set: project });
  
  if (updatedInfo.modifiedCount !== 1) {
    throw "Could not successfully approve contract";
  }
  return await getContract(projectId);
}

const setReminderDate = async (projectId) => {
  validation.checkId(projectId);

  let currentProject = await getProject(projectId);
  let projectDueDate = new Date(currentProject.dueDate);
  reminderTime = projectDueDate.setDate(projectDueDate.getDate() - 2);
  reminderTime = new Date(reminderTime);

  let setReminder = {
    reminderDate: reminderTime,
  };

  const projectCollection = await projects();
  const updatedInfo = await projectCollection.updateOne(
    { _id: new ObjectId(projectId) },
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

module.exports = {
  createProject,
  getProject,
  getContract,
  approveContract,
  setReminderDate,
  sendReminderEmail,
};
