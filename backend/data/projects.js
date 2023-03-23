const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const projects = mongoCollections.projects;
const contractorData = require("./contractors");
var nodemailer = require("nodemailer");
const validation = require("../validation");

let stages = [
  "Create contract",
  "Send contract",
  "Receive contract approval",
  "Create bank request",
  "Send bank request",
  "Receive bank approval",
  "Initial site visit",
  "Ordering materials",
  "Receiving materials",
  "Installation",
  "Inspection"
]

const createProject = async (title, description, dueDate) => {
  validation.checkForValue(title);
  validation.checkForValue(description);
  validation.checkForValue(dueDate);

  const projectCollection = await projects();
  let newProject = {
    title: title,
    description: description,
    tasksToDo: stages,
    inProgress: null,
    notes: [],
    dueDate: dueDate,
    reminderDate: null,
    reminderSent: false,
    contract: {
      _id: new ObjectId(),
      bankApproval: false,
      dateBankApproval: null,
      utilityApproval: false,
      dateUtilityApproval: null,
      approved: false,
      dateApproved: null,
    },
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
  const project = await projectCollection.findOne({
    _id: new ObjectId(projectId),
  });
  if (project === null) {
    throw "No project with that id found!";
  }
  project._id = project._id.toString();
  return project;
};

const getTasks = async (projectId) => {
  validation.checkId(projectId);

  let currentProject = await getProject(projectId);
  let tasksToDo = currentProject.tasksToDo;
  return tasksToDo;
};

const updateTaskStatus = async (projectId) => {
  validation.checkId(projectId);

  let inProgress = null;
  tasks = await getTasks(projectId);
  console.log(tasks)
  if (tasks) {
    inProgress = tasks.shift()
  } else {
    console.log("There are no more tasks to do. The project has been completed!")
  }
  const projectCollection = await projects();

  tasksUpdated = {
    tasksToDo: tasks,
    inProgress: inProgress
  }

  const updatedInfo = await projectCollection.updateOne(
    {_id: new ObjectId(projectId)}, 
    {$set: tasksUpdated});

  if (updatedInfo.modifiedCount !== 1) {
    throw "Could not successfully update task status";
  }
}

const bankRequest = function bankRequest(projectId) {
  validation.checkId(projectId);

  console.log("I am requesting bank approval for my project.");
  const randomNum = Math.random();
  if (randomNum === 0) {
    console.log("The bank has not approved this project.");
    return false;
  } else {
    console.log("The bank approves this request!");
    return true;
  }
}

const bankApproval = async function bankApproval(projectId) {
  validation.checkId(projectId);

  const projectCollection = await projects();
  const project = await getProject(projectId);
  if (!project.contract) {
    throw "No contract found for this project";
  }

  const contract = project.contract;
  const bankApproval = bankRequest(projectId);
  contract.bankApproval = bankApproval;
  contract.dateBankApproval = new Date();

  updatedBankApproval = {
    contract: contract
  }

  const updatedInfo = await projectCollection.updateOne(
    { _id: new ObjectId(projectId) },
    { $set: contract}
  );

  if (updatedInfo.modifiedCount !== 1) {
    throw "Could not successfully update bank approval";
  }
};

const utilityRequest = function utilityRequest(projectId) {
  validation.checkId(projectId);
  
  console.log("I am requesting utility approval for my project.");
  const randomNum = Math.random();
  if (randomNum === 0) {
    console.log("The utility company has not approved this project.");
    return false;
  } else {
    console.log("The utility company approves this request!");
    return true;
  }
}

const utilityApproval = async function utilityApproval(projectId) {
  validation.checkId(projectId);
  
  const projectCollection = await projects();
  const project = await getProject(projectId);
  if (!project.contract) {
    throw "No contract found for this project";
  }

  const contract = project.contract;
  const utilityApproval = utilityRequest(projectId);
  contract.utilityApproval = utilityApproval;
  contract.dateUtilityApproval = new Date();

  updatedUtilityApproval = {
    contract: contract
  }

  const updatedInfo = await projectCollection.updateOne(
    { _id: new ObjectId(projectId) },
    { $set: contract}
  );
  
  if (updatedInfo.modifiedCount !== 1) {
    throw "Could not successfully update utility approval";
  }
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
};

const approveContract = async (projectId) => {
  validation.checkId(projectId);

  const projectCollection = await projects();
  const project = await projectCollection.findOne({
    _id: new ObjectId(projectId),
  });
  if (project === null) {
    throw "No project with that id found!";
  }
  if (!project.contract) {
    throw "No contract found for this project";
  }

  if (project.contract.bankApproval && project.contract.utilityApproval) {
    project.contract.approved = true;
    project.contract.dateApproved = new Date();
  } else {
    throw "Cannot approve contract until all approvals are received";
  }

  const updatedInfo = await projectCollection.updateOne(
    { _id: new ObjectId(projectId) },
    { $set: project }
  );

  if (updatedInfo.modifiedCount !== 1) {
    throw "Could not successfully approve contract";
  }
  return await getContract(projectId);
};

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

  if (updatedInfo.modifiedCount !== 1) {
    throw "Could not successfully set reminder date";
  }
};

const createNotes = async (projectId, notes) => {
  validation.checkId(projectId);
  validation.checkTextValue(notes);

  let currentProject = await getProject(projectId);
  newNotes = currentProject.notes;
  newNotes.push(notes);
  let setNotes = {
    notes: newNotes,
  };

  const projectCollection = await projects();
  const updatedInfo = await projectCollection.updateOne(
    { _id: new ObjectId(projectId) },
    { $set: setNotes }
  );

  if (updatedInfo.modifiedCount !== 1) {
    throw "Could not successfully create notes";
  }
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
  getTasks,
  updateTaskStatus,
  bankRequest,
  bankApproval,
  utilityRequest,
  utilityApproval,
  getContract,
  approveContract,
  setReminderDate,
  sendReminderEmail,
  createNotes,
};
