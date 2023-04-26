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
    const equipmentDelivered2 = await projectsApi.updateEquipmentDelivered(project2._id, ["Racking", "Electrical"])
    
    const project3 = await projectsApi.createProject(
      "Make house more energy efficient",
      "Change electrical wiring and add solar panels to back side of the roof",
      new Date(2023, 11, 15)
      );
    const reminderDate3 = await projectsApi.setReminderDate(project3._id)

  // Create contractors (name, email, password)
    const contractor1 = await contractorsApi.createContractor(
      "Venkat Anna",
      "vanna@stevens.edu",
      "Password1-",
      );
    const projectToDo1_1 = await contractorsApi.addProjectToDo(contractor1._id.toString(), project1._id);
    const projectToDo1_2 = await contractorsApi.addProjectToDo(contractor1._id.toString(), project2._id);
    const message1_1 = await contractorsApi.addMessage(contractor1._id.toString(), {from: "SenderId1", text: "Hello World!"});
    const message1_2 = await contractorsApi.addMessage(contractor1._id.toString(), {from: "SenderId2", text: "Please repsond back asap!"});
    const startNextTask1_1 = await contractorsApi.startNextTaskInQueue(contractor1._id.toString(), project1._id);
    
    const contractor2 = await contractorsApi.createContractor(
      "Audie Breslin", 
      "abreslin@stevens.edu",
      "ILoveCoding0^"
    );
    const projectsToDo = await contractorsApi.addProjectToDo(contractor2._id.toString(), project3._id);
    const getToDo = await contractorsApi.getTaskInProgress(contractor1._id.toString(), project1._id);
    const nextTask = await contractorsApi.startNextTaskInQueue(contractor1._id.toString(), project1._id);
    const getToDo2 = await contractorsApi.getTaskInProgress(contractor1._id.toString(), project1._id);

    // Create users (name, email, password, balance)
    const user1 = await usersApi.createUser("Connor Haaf", "chaaf@stevens.edu", "Password123!", 10000)
    const addMoney1_1 = await usersApi.depositMoney(user1._id.toString(), 2000)
    const payBill1_1 = await usersApi.payBill(user1._id.toString(), project1._id)
    const addMessage1_1 = await usersApi.addMessage(user1._id.toString(), "Could you please call me please?")
    const addMessage1_2 = await usersApi.addMessage(user1._id.toString(), "I need to talk to you about the project")
    const taskStatus1_1 = await usersApi.updateStatus(user1._id.toString(), project1._id)
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

  //  await projectsApi.sendReminderEmail(project1._id, contractor1._id); 