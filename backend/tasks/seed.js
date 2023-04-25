// const mongoCollections = require("../config/mongoCollections");
const mongoConnection = require("../config/mongoConnection");

const data = require("../data");
const contractorsApi = data.contractors;
const projectsApi = data.projects;
const usersApi = data.users;

const seeding = async () => {
  const db = await mongoConnection.connectToDb();
  await db.dropDatabase();

  try {
    // Projects (title, description, dueDate)
    const project1 = await projectsApi.createProject(
      "Install solar panels", 
      "Solar panels will be installed on the roof of the house", 
      new Date(2024, 1, 1)
      );
    const reminderDate1 = await projectsApi.setReminderDate(project1._id)
    const nextTask1_1 = await projectsApi.updateTaskStatus(project1._id)
    const note1_1 = await projectsApi.createNotes(project1._id, "This is a note")
    const note1_2 = await projectsApi.createNotes(project1._id, "This is another note")
    const comment1_1 = await projectsApi.createComment(project1._id, 2, "Need Robert to come in and look")

    const project2 = await projectsApi.createProject(
      "Add additional solar panels", 
      "Add 4 more solar panels to the roof", 
      new Date(2023, 6, 2)
      );
    const reminderDate2 = await projectsApi.setReminderDate(project2._id)
    const nextTask2_1 = await projectsApi.updateTaskStatus(project2._id)
    const nextTask2_2 = await projectsApi.updateTaskStatus(project2._id)
    const note2_1 = await projectsApi.createNotes(project2._id, "This is a note")
    const note2_2 = await projectsApi.createNotes(project2._id, "This is another note")
    const comment2_1 = await projectsApi.createComment(project2._id, 4, "Bank said to call back on Monday")
    const estimatedCompletion2 = await projectsApi.expectedProjectCompletionTime(project2._id)
    const bankApproval2 = await projectsApi.bankApproval(project2._id)
    const utilityApproval2 = await projectsApi.utilityApproval(project2._id)
    const contractApproval2 = await projectsApi.approveContract(project2._id)
    const addEquipment2 = await projectsApi.addEquipment(project2._id, ["Solar Panels", "Inverter", "Racking", "Electrical"])
    const equipmentDelivered2 = await projectsApi.equipmentDelivered(project2._id, ["Racking", "Electrical"]) // Need to double check functionality

  const project3 = await projectsApi.createProject(
    "Make house more energy efficient",
    "Change electrical wiring and add solar panels to back side of the roof",
    new Date(2023, 11, 15)
    );
  const reminderDate3 = await projectsApi.setReminderDate(project3._id)


  // Create contractors
  const contractor2 = await contractorsApi.createContractor(
    "Venkat Anna",
    "vanna@stevens.edu", // WHEN TESTING, INPUT YOUR EMAIL
    [
      { from: "SenderId1", text: "Hello World!" },
      { from: "SenderId2", text: "Please repsond back asap!" },
    ],
    [
      { projectId: project1._id, tasks: ["task 1", "task2, task3"] },
      { projectId: project2._id, tasks: ["task 2.1", "task2.2, task2.3"] },
    ],
    [
      { projectId: project1._id, date: project1.dueDate },
      { projectId: project2._id, date: project2.dueDate },
    ],
    [
      { projectId: project1._id, approved: true },
      { projectId: project2._id, approved: false },
    ]
  );

  
    // Create contractors
    const contractor1 = await contractorsApi.createContractor("Audie Breslin", "abreslin@stevens.edu", [], [project1._id, project2._id], [], []);
    const projectsToDo = await contractorsApi.getProjectsToDo(contractor1._id.toString());
    console.log(projectsToDo);
    // const todo1 = await contractorsApi.addTaskToQueue(contractor1._id.toString(), project1._id, "task 1");
    // const todo2 = await contractorsApi.addTaskToQueue(contractor1._id.toString(), project1._id, "task 2");
    // const todo3 = await contractorsApi.addTaskToQueue(contractor1._id.toString(), project1._id, "task 3");
    const getToDo = await contractorsApi.getTaskInProgress(contractor1._id.toString(), project1._id);
    console.log(getToDo);
    const nextTask = await contractorsApi.startNextTaskInQueue(contractor1._id.toString(), project1._id);
    const getToDo2 = await contractorsApi.getTaskInProgress(contractor1._id.toString(), project1._id);
    console.log(getToDo2);

    // Create users
    const user1 = await usersApi.createUser("Connor Haaf", "chaaf@stevens.edu", "Password123!", 757.27)
    console.log("here")
    const billPay = await usersApi.payBill(user1._id.toString(), project1._id)
    const userBalance = await usersApi.getBalance(user1._id.toString())
    console.log("User Balance: " + userBalance)
    const depositMoney = await usersApi.depositMoney(user1._id.toString(), 500)
    const userBalance2 = await usersApi.getBalance(user1._id.toString())
    console.log("User Balance: " + userBalance2)

  //  await projectsApi.sendReminderEmail(project1._id, contractor1._id);
  // Create users
  // Need to create createUsers function

  console.log("Database has been seeded!");
} catch (e) {
  console.log(e);
  }
};

const main = async () => {
  await seeding();
  mongoConnection.closeConnection();
};

main();
