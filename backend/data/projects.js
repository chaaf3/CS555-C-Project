const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const projects = mongoCollections.projects;
const contractorData = require("./contractors");
var nodemailer = require("nodemailer");
const validation = require("../validation");

// TODO (refactoring): make sure that all functions error check for proper arguments
// TODO (refactoring): figure out how to incorporate bank request and approval for project payment

let stages = {
  InitialSiteVisit: 5,
  CreateBankRequest: 2,
  SendBankRequest: 1,
  ReceiveBankApproval: 5,
  CreateUtilityRequest: 2,
  SendUtilityRequest: 1,
  ReceiveUtilityApproval: 5,
  CreateContract: 3,
  SendContract: 1,
  ReceiveContractApproval: 5,
  OrderingMaterials: 3,
  ReceivingMaterials: 14,
  Installation: 5,
  Inspection: 2,
}

let task_obj = 
{
  1: "InitialSiteVisit",
  2: "CreateBankRequest",
  3: "SendBankRequest",
  4: "ReceiveBankApproval",
  5: "CreateUtilityRequest",
  6: "SendUtilityRequest",
  7: "ReceiveUtilityApproval",
  8: "CreateContract",
  9: "SendContract",
  10: "ReceiveContractApproval",
  11: "OrderingMaterials",
  12: "ReceivingMaterials",
  13: "Installation",
  14: "Inspection"
}

const createProject = async (title, description, dueDate) => {
  validation.checkForValue(title);
  validation.checkForValue(description);
  validation.checkForValue(dueDate);

  maxProjectCost = 7500
  minProjectCost = 2500

  balance = Number((Math.random() * (maxProjectCost - minProjectCost + 1) + minProjectCost).toFixed(2));

  const projectCollection = await projects();
  let newProject = {
    title: title,
    description: description,
    balance: balance,
    tasksToDo: Object.keys(stages),
    inProgress: null,
    notes: [], // general notes for the project overall
    comments: [], // for specific tasks
    dueDate: dueDate,
    reminderDate: null,
    reminderSent: false,
    equipmentRequired: [],
    deliveredEquipment: [],
    neededEquipment: [],
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
  return tasksUpdated;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const bankRequest = function bankRequest(projectId) {
  validation.checkId(projectId);

  console.log("I am requesting bank approval for my project.");
  const randomNum = getRandomInt(2);
  console.log(randomNum)
  if (randomNum == 0) {
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
  if (!project) {
    throw "No project found with that id";
  }
  if (!project.contract) {
    throw "No contract found for this project";
  }

  const contract = project.contract;
  contract.bankApproval = bankRequest(projectId);
  if (contract.bankApproval) {
    contract.dateBankApproval = new Date();
  } else {
    return;
  }

  const updatedInfo = await projectCollection.updateOne(
    { _id: new ObjectId(projectId) },
    { $set: {contract: contract}}
  );

  if (updatedInfo.modifiedCount !== 1) {
    throw "Could not successfully update bank approval";
  }
};

const utilityRequest = function utilityRequest(projectId) {
  validation.checkId(projectId);
  
  console.log("I am requesting utility approval for my project.");
  const randomNum = getRandomInt(2);
  console.log(randomNum)
  if (randomNum == 0) {
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
  if (!project) {
    throw "No project found with that id";
  }
  if (!project.contract) {
    throw "No contract found for this project";
  }

  const contract = project.contract;
  contract.utilityApproval = utilityRequest(projectId);

  if (contract.utilityApproval) {
    contract.dateUtilityApproval = new Date();
  } else {
    return ;
  }

  const updatedInfo = await projectCollection.updateOne(
    { _id: new ObjectId(projectId) },
    { $set: {contract: contract}}
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
  return reminderTime;
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

const getNotes = async (projectId) => {
  validation.checkId(projectId);

  let currentProject = await getProject(projectId);
  if (!currentProject.notes) {
    throw "No notes found for this project";
  }

  const notes = currentProject.notes;

  let counter = 0
  for (let i = notes.length - 1; i >= 0; i--) {
    console.log(counter + ": " + notes[i]);
    counter++;
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

const addEquipment = async (projectId, items) => {
  projectCollection = await projects();
  let currentProject = await projectCollection.findOne({_id: new ObjectId(projectId)});
  if (!currentProject) 
  {
    throw new Error(`Project with ID ${projectId} not found`);
  }
 
  currentProject.equipmentRequired.push(...items);
  currentProject.neededEquipment = currentProject.equipmentRequired;

  await projectCollection.updateOne({_id: new ObjectId(projectId)}, {
    $set: {
      equipmentRequired: currentProject.equipmentRequired,
      deliveredEquipment: currentProject.deliveredEquipment,
      neededEquipment: currentProject.neededEquipment
    }
  });
}

const updateEquipmentDelivered = async (projectId, deliveredItems ) => {
  projectCollection = await projects();
  let currentProject = await projectCollection.findOne({_id: new ObjectId(projectId)});
  if (!currentProject) {
    throw new Error(`Project with ID ${projectId} not found`);
  }

  currentProject.deliveredEquipment.push(...deliveredItems);
  let neededEquipment = currentProject.equipmentRequired.filter((equipment) => !currentProject.deliveredEquipment.includes(equipment));

  await projectCollection.updateOne({_id: new ObjectId(projectId)}, {
    $set: {
      deliveredEquipment: currentProject.deliveredEquipment,
      neededEquipment: neededEquipment
    }
  });
}

const expectedProjectCompletionTime = async (projectId) => {
  validation.checkId(projectId);

  totalDays = 0
  let currentProject = await getProject(projectId);
  remainingTasks = currentProject.tasksToDo
  for (let i = 0; i < remainingTasks.length; i++) {
    totalDays += stages[remainingTasks[i]]
  }

  if (totalDays == 0) {
    console.log("Project status: Completed")
  } else {
    console.log("Project status: In Progress")
    console.log("Expected Project Completion Time: " + totalDays + " days")
  }
  
  return totalDays
}

const createComment = async (projectId, taskNum, comment) =>
{
  let currentProject = await getProject(projectId)
  // console.log(currentProject);
  if (taskNum > 14 || taskNum < 1)
  {
    throw `Error: taskNum must be between 1 and 14`
  }
  if (typeof comment !== 'string' || comment.trim().length === 0)
  {
    throw `Error: comment must be a non empty string`
  }
  comment.trim()
  let task_name = task_obj[taskNum]
  let fullComment = `${task_name}: ${comment}`
  currentProject.comments.push(fullComment)


  const projectCollection = await projects();
  const updatedInfo = await projectCollection.updateOne(
    {_id: new ObjectId(projectId)}, 
    {$set: {comments: currentProject.comments}}
  );
  return updatedInfo;
}

const getComments = async (projectId) => {
  let currentProject = await getProject(projectId)
  return currentProject.comments
}

const generateBill = async (projectId) => {
  //balance
  //dueDate
  //notes section
}

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
  getNotes,
  addEquipment,
  updateEquipmentDelivered,
  createComment,
  expectedProjectCompletionTime,
  getComments
};