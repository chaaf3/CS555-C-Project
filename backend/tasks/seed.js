// const mongoCollections = require("../config/mongoCollections");
const mongoConnection = require("../config/mongoConnection");

const data = require("../data");
const contractorsApi = data.contractors
const projectsApi = data.projects
const usersApi = data.users

// const contractorsDb = mongoCollections.contractors
// const projectsDb = mongoCollections.projects
// const usersDb = mongoCollections.users

const side = async () => {
    const db = await mongoConnection.connectToDb()
    await db.dropDatabase()
    
    // Create projects
    const project1 = await projectsApi.createProject(
        new Date(2024, 1, 1)
    )
    // const project1ReminderDate = await projectsApi.setReminderDate(project1._id)

    const project2 = await projectsApi.createProject(
        new Date(2023, 6, 2)
    )
    // const project2ReminderDate = await projectsApi.setReminderDate(project2._id)
  
    const project3 = await projectsApi.createProject(
        new Date(2023, 11, 15)
    ) 
    // const project3ReminderDate = await projectsApi.setReminderDate(project3._id)

    // Create contractors
    const contractor1 = await contractorsApi.createContractor(
        "Venkat Anna",
        "vanna@stevens.edu", // WHEN TESTING, INPUT YOUR EMAIL
        [
            {from: "SenderId1", text: "Hello World!" },
            {from: "SenderId2", text: "Please repsond back asap!" },
        ],
        [
            {projectId: project1._id, tasks: ["task 1", "task2, task3"] },
            {projectId: project2._id, tasks: ["task 2.1", "task2.2, task2.3"]},
        ],
        [ 
            {projectId: project1._id, date: project1.dueDate},
            {projectId: project2._id, date: project2.dueDate}
        ]
    )

    await projectsApi.sendReminderEmail(project1._id, contractor1._id)
    // Create users
    // Need to create createUsers function

  console.log("Database has been seeded!")
}
const main = async () => {
    await side();
    mongoConnection.closeConnection();
}
main()