const express = require("express");
const configRoutes = require("./routes");
const projects = require("./data/projects");
const data = require("./data");
// const app = express();

// app.use(express.json())

let temp;
async function tempTasks() {
  // temp = await data.contractors.getContractor("6408026590a4c9ac56a9947e");
  // let tasks = data.contractors.getTasks(temp);
  // console.log(tasks);
  // console.log(await projects.sendReminderEmail("6408026590a4c9ac56a9947e"));
  // let messages = data.contractors.getMessages(temp);
  // console.log(messages);
  // let test = await data.contractors.isApproved(
  //   "640ba5e63966bfa8e9e27291",
  //   "640ba5e63966bfa8e9e2728f"
  // );
  let test2 = await data.contractors.updateApproval(
    "640ba5e63966bfa8e9e27291",
    "640ba5e53966bfa8e9e2728e"
  );

  console.log(test2);
}
tempTasks();

// configRoutes(app);

// app.listen(3000, () => {
//   console.log("We've now got a server!");
//   console.log("Your routes will be running on http://localhost:3000");
// });
