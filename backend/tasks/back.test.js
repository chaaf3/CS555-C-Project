// const mongoCollections = require("../config/mongoCollections");
const mongoConnection = require("../config/mongoConnection");

const data = require("../data");
const contractorsApi = data.contractors;
const projectsApi = data.projects;
const usersApi = data.users;

// TODO: test contractors code
let project1;
let project1ReminderDate;
let testData;
let project2;
let project2ReminderDate;
let contractor1;
let project1RD;

const seeding = async () => {
  const db = await mongoConnection.connectToDb();
  await db.dropDatabase();

  // Create projects
  try {
    project1 = await projectsApi.createProject(
      "Install solar panels",
      "Solar panels will be installed on the roof of the house",
      new Date(2024, 1, 1)
    );
    project1ReminderDate = await projectsApi.setReminderDate(project1._id);
    project1RD = await projectsApi.getProject(project1._id);
    const nextTask1 = await projectsApi.updateTaskStatus(
      project1._id.toString()
    );

    testData = await projectsApi.getProject(project1._id.toString());
    testData = testData.reminderDate;

    project2 = await projectsApi.createProject(
      "Add additional solar panels",
      "Add 4 more solar panels to the roof",
      new Date(2023, 6, 2)
    );
    project2ReminderDate = await projectsApi.setReminderDate(project2._id);
    const nextTask2 = await projectsApi.updateTaskStatus(project2._id);
    const nextTask3 = await projectsApi.updateTaskStatus(project2._id);
    const estimatedCompletion = await projectsApi.expectedProjectCompletionTime(
      project2._id
    );

    // const bankApproval2 = await projectsApi.bankApproval(project2._id);
    // const utilityApproval = await projectsApi.utilityApproval(project2._id);
    // const contractApproval = await projectsApi.approveContract(project2._id);

    // const project3 = await projectsApi.createProject(new Date(2023, 11, 15));
    // const project3ReminderDate = await projectsApi.setReminderDate(project3._id)

    // Create contractors
    contractor1 = await contractorsApi.createContractor(
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
    //  await projectsApi.sendReminderEmail(project1._id, contractor1._id);
    // Create users
    // Need to create createUsers function

    console.log("Database has been seeded!");
  } catch (e) {
    console.log(e);
  }
};
test("Verify title", async () => {
  await main();
  expect(project1.title).toBe("Install solar panels");
});

test("Verify description", async () => {
  expect(project1.description).toBe(
    "Solar panels will be installed on the roof of the house"
  );
});
test("Verify Reminder Date", async () => {
  console.log(project1ReminderDate);
  expect(project1RD.reminderDate.toString()).toBe(testData.toString());
});
test("Verify Project 2 Description", async () => {
  expect(project2.description).toBe("Add 4 more solar panels to the roof");
});
console.log(contractor1);
test("Verify contractor name", async () => {
  expect(contractor1.name).toBe("Venkat Anna");
});
const main = async () => {
  await seeding();
  mongoConnection.closeConnection();
};