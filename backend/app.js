const express = require("express");
const configRoutes = require("./routes");
const projects = require("./data/projects");
const data = require("./data");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

let temp;
async function tempTasks() {
  try {
    // await data.projects.createNotes("641df29e45e0bf37635280e4", "Let user add their choice of roof side for solar pannel")
    // console.log("Notes created")
    // await data.projects.createNotes("641df29e45e0bf37635280e4", "Need new solars panels for left side of the roof")
    // console.log("Notes created")
    notes = await data.projects.getNotes("641df29e45e0bf37635280e4")
  } catch (e) {
    console.log(e)
  }

  // try {
  //   // let temp = await data.users.createUser("John Doe", "johndoe@stevens.edu2", "Password1-");
  //   let temp = await data.users.getUser("642dbe933427761f8e1e10a5");
  //   console.log(temp);
  //   let temp2 = await data.users.checkUser(
  //     "johndoe@stevens.edu2",
  //     "Password1-"
  //   );
  //   console.log(temp2);
  // } catch (e) {
  //   console.log(e);
  //   return;
  // }
  // try {
  //   temp = await data.projects.getContract("641cabad1eb8428252b50441");
  //   temp = await data.projects.approveContract("641cabad1eb8428252b50441");
  //   await data.projects.setNotes(
  //     "641cabad1eb8428252b50441",
  //     "Let user add their choice of roof side for solar pannel"
  //   );
  //   temp = await data.projects.getProject("641cabad1eb8428252b50441");
  //   temp = temp.notes;
  //   console.log(temp);
  // } catch (e) {
  //   console.log(e);
  //   return;
  // }

  // let tasks = data.contractors.getTasks(temp);
  // console.log(tasks);
  // console.log(await projects.sendReminderEmail("6408026590a4c9ac56a9947e"));
  // let messages = data.contractors.getMessages(temp);
  // console.log(messages);
  // let test = await data.contractors.isApproved(
  //   "640ba5e63966bfa8e9e27291",
  //   "640ba5e63966bfa8e9e2728f"
  // );

  // // let test2 = await data.contractors.updateApproval(
  // //   "640ba5e63966bfa8e9e27291",
  // //   "640ba5e53966bfa8e9e2728e"
  // // );

  // console.log(test2);
}
tempTasks();

configRoutes(app);

app.listen(3001, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3001");
});
