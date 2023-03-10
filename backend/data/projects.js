const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const projects = mongoCollections.projects;
const contractorData = require("./contractors");
var nodemailer = require("nodemailer");

const createProject = async (dueDate) => {
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
  const projectCollection = await projects();
  const project = await projectCollection.findOne({ _id: new ObjectId(id) });
  if (project === null) {
    throw "No project with that id found!";
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
const setReminderDate = async (id) => {
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

confirmEmailSent = async (projectId, error, info) => {
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
