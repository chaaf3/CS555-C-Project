const express = require("express");
const app = express();
const configRoutes = require("./routes");
const projects = require("./data/projects");

app.use(express.json());

configRoutes(app);
async function tempTasks() {
  console.log(await projects.createProject("2021-05-01T00:00:00.000Z"))
}

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
