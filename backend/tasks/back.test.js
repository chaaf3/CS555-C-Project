// const mongoCollections = require("../config/mongoCollections");
const mongoConnection = require("../config/mongoConnection");

const data = require("../data");
const contractorsApi = data.contractors;
const projectsApi = data.projects;
const usersApi = data.users;

let project1;
let project2;
let project1ReminderDate;
let project1RD;
let project2ReminderDate;
let project2RD;
let nextTask1;
let nextTask2;
let nextTask3;
let estimatedCompletion;
let updatedWithComment;
let contractor1;
let user1;

const main = async () => {
  const db = await mongoConnection.connectToDb();
  await db.dropDatabase();

  project1 = await projectsApi.createProject(
    "Install solar panels",
    "Solar panels will be installed on the roof of the house",
    new Date(2024, 1, 1)
  );
  project1._id = project1._id.toString();
  project2 = await projectsApi.createProject(
    "Add additional solar panels",
    "Add 4 more solar panels to the roof",
    new Date(2023, 6, 2)
  );
  project2._id = project2._id.toString();

  project1ReminderDate = await projectsApi.setReminderDate(project1._id);
  project1RD = (await projectsApi.getProject(project1._id)).reminderDate;

  project2ReminderDate = await projectsApi.setReminderDate(project2._id);
  project2RD = (await projectsApi.getProject(project2._id)).reminderDate;
  
  nextTask1 = await projectsApi.updateTaskStatus(project1._id);
  nextTask2 = await projectsApi.updateTaskStatus(project1._id);
  nextTask3 = await projectsApi.updateTaskStatus(project1._id);

  estimatedCompletion = await projectsApi.expectedProjectCompletionTime(project2._id);

  updatedWithComment = await projectsApi.createComment(project1._id, 5,"test comment");
  
  contractor1 = await contractorsApi.createContractor(
    "Venkat Anna",
    "vanna@stevens.edu", // WHEN TESTING, INPUT YOUR EMAIL
    "Password1-",
    [
      { from: "SenderId1", text: "Hello World!" },
      { from: "SenderId2", text: "Please repsond back asap!" },
    ],
    [
      { projectId: project1._id, tasks: ["task 1", "task2", "task3"] },
      { projectId: project2._id, tasks: ["task 2.1", "task2.2", "task2.3"] },
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
  contractor1._id = contractor1._id.toString();

  user1 = await usersApi.createUser("audie", "abreslin@stevens.edu", "Password1-");
};

describe("Project Tests", () => {
  beforeAll(async () => {
    await mongoConnection.connectToDb();
    await main();
  });
  afterAll(async () => {
    await mongoConnection.closeConnection();
  });
  it("Verify title", async () => {
    expect(project1.title).toBe("Install solar panels");
  });

  it("Verify description", async () => {
    expect(project1.description).toBe(
      "Solar panels will be installed on the roof of the house"
    );
  });

  it("Verify Reminder Date", async () => {
    expect(project1RD.toString()).toBe(project1ReminderDate.toString());
  });

  it("Verify Project 2 Description", async () => {
    expect(project2.description).toBe("Add 4 more solar panels to the roof");
  });
  it("Verify create contractor name", async () => {
    expect(contractor1.name).toBe("Venkat Anna");
  });

  it("Verify create contractor email", async () => {
    expect(contractor1.email).toBe("vanna@stevens.edu");
  });

  // Contractor tests
  it("Verify create contractor messages", async () => {
    expect(contractor1.messages).toEqual([{from: "SenderId1", text: "Hello World!"},
    {from: "SenderId2", text: "Please repsond back asap!"}]);
  });

  it("Verify create contractor todo", async () => {
    expect(contractor1.todo).toEqual([{projectId: project1._id, tasks: ["task 1", "task2", "task3"]},
                                      {projectId: project2._id, tasks: ["task 2.1", "task2.2", "task2.3"]}]);
  });

  it("Verify create contractor calendar", async () => {
    expect(contractor1.calendar).toEqual([{projectId: project1._id, date: project1.dueDate},
    {projectId: project2._id, date: project2.dueDate}]);
  });

  it("Verify create contractor bankPayment", async () => {
    expect(contractor1.bankPayment).toEqual([{projectId: project1._id, approved: true},
    {projectId: project2._id, approved: false}]);
  });

  it("Verify get contractor", async () => {
    const contractor = await contractorsApi.getContractor(contractor1._id);
    expect(contractor.name).toBe("Venkat Anna");
  });

  it("Verify get contractor messages", async () => {
    const messages = await contractorsApi.getMessages(contractor1._id);
    expect(messages).toEqual(contractor1.messages);
  });

  it("Verify get contractor queue", async () => {
    const queue = await contractorsApi.getQueue(contractor1._id);
    expect(queue).toEqual(contractor1.queue);
  });

  it("Verify get contractor in Progress task", async () => {
    const inProgress = await contractorsApi.getInProgress(contractor1._id);
    expect(inProgress).toEqual(contractor1.inProgress);
  });

  it("Verify start next task", async () => {
    const nextTask = await contractorsApi.startNextTaskInQueue(contractor1._id, project1._id);
    expect(nextTask.todo).toEqual([{"projectId": project1._id, "tasks": ["task2", "task3"]}, {"projectId": project2._id, "tasks": ["task 2.1", "task2.2", "task2.3"]}]);
  });

  it("Verify add task to queue", async () => {
    const addTask = await contractorsApi.addTaskToQueue(contractor1._id, project1._id, "task 4");
    expect(addTask.todo).toEqual([{"projectId": project1._id, "tasks": ["task2", "task3", "task 4"]}, {"projectId": project2._id, "tasks": ["task 2.1", "task2.2", "task2.3"]}]);
  });

  it("Verify user name", async () => {
    expect(user1.name).toBe("audie");
  });

  it("Verify user email", async () => {
    expect(user1.email).toBe("abreslin@stevens.edu");
  });

  it("Verify get project", async () => {
    const project = await projectsApi.getProject(project1._id);
    expect(project.title).toBe("Install solar panels");
  });

  it("Verify create comment", async () => {
    const project = await projectsApi.getProject(project1._id);
    expect(project.comments[0]).toBe("CreateUtilityRequest: test comment");
  });

  it("Verify tasks", async () => {
    const project = await projectsApi.getProject(project1._id);
    expect(project.tasksToDo).toEqual(nextTask3.tasksToDo);
  });
});
