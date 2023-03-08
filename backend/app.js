const express = require("express");
const configRoutes = require("./routes");
const projects = require("./data/projects");
const data = require("./data");

data.contractors.createContractor(
  "venkat",
  "venkat@stevens.edu",
  [
    { from: "ssdfijiausrhfij", text: "message from a friend" },
    { from: "ssdfijiausrhfij", text: "Another message from a friend" },
  ],
  [
    { projectId: "ksjdhfihasdkifgjhlkj", tasks: ["task 1", "task2, task3"] },
    {
      projectId: "ksjdhfihasdkifgjhlkj",
      tasks: ["task 2.1", "task2.2, task2.3"],
    },
  ],
  "datetime here"
);
let temp;
async function tempTasks() {
  temp = await data.contractors.getContractor("6407ee67ae874c53804fbdd6");
  let tasks = data.contractors.getTasks(temp);
  console.log(tasks);
}
async function tempMessages() {
  temp = await data.contractors.getContractor("6407ee67ae874c53804fbdd6");
  let messages = data.contractors.getMessages(temp);
  console.log(messages);
}
tempMessages();

configRoutes(app);

// data.contractors.createContractor(
//   "venkat",
//   "venkat@stevens.edu",
//   [
//     { from: "ssdfijiausrhfij", text: "message from a friend" },
//     { from: "ssdfijiausrhfij", text: "Another message from a friend" },
//   ],
//   [
//     { projectId: "ksjdhfihasdkifgjhlkj", tasks: ["task 1", "task2, task3"] },
//     {
//       projectId: "ksjdhfihasdkifgjhlkj",
//       tasks: ["task 2.1", "task2.2, task2.3"],
//     },
//   ],
//   "datetime here"
// );


// /*{
//     id: lksdjf;kiuhiasurhgojasd;ufh,
//     name: James something,
//     email: jamesSomething@gmail.com,
//     messages: [{from: (sender uuid), text: "this is a message from a friend"}],
//     todo: [{projectId: alslksdjfoidifjpiuahjse, tasks:["This is a task in text", 'this is another text task']}],
//     calender: [{projectId: kajsdhfgiubiea, DateTime: DateTimeObjectInstance}],
//     bankPayment: [{projectId: kajsdhfgiubiea, approved: true}],
//     }
//     */


async function tempTasks() {
  // console.log(await projects.createProject("2021-05-01T00:00:00.000Z"))
  console.log(await project.sendReminderEmail("66408026590a4c9ac56a9947e"))
}

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
