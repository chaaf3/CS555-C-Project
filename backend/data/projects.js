const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const projects = mongoCollections.projects;
const contractorData = require("./contractors");
var nodemailer = require("nodemailer");
const validation = require("../validation");

let stages = {
  1: "Create contract",
  2: "Send contract",
  3: "Receive contract approval",
  4: "Create bank request",
  5: "Send bank request",
  6: "Receive bank approval",
  7: "Initial site visit",
  8: "Ordering materials",
  9: "Receiving materials",
  10: "Installation",
  11: "Inspection",
}

const createProject = async (title, description, dueDate) => {
  validation.checkForValue(title);
  validation.checkForValue(description);
  validation.checkForValue(dueDate);
  
  tasksToDo = Object.values(stages);

  const projectCollection = await projects();
  let newProject = {
    title: title,
    description: description,
    tasksToDo: tasksToDo,
    dueDate: dueDate,
    reminderDate: null,
    reminderSent: false,
  };
  const insertInfo = await projectCollection.insertOne(newProject);
  if (insertInfo.insertedCount === 0) {
    throw "Could not add project";
  }
  const newId = insertInfo.insertedId.toString();
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

const getTasks = async (projectId) => {
  validation.checkId(projectId);

  let currentProject = await getProject(projectId);
  let tasksToDo = currentProject.todo;
  
  return tasksToDo;
}

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

module.exports = {
  createProject,
  getProject,
  setReminderDate,
  sendReminderEmail,
};
