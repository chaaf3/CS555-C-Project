const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const projectData = data.projects;
// const validation = require("../validation");
router.post("/signIn", async (req, res) => {
  try {
    let inputs = req.body.values;
    console.log(inputs);
    let signIn = await userData.checkUserAccount(inputs.email, inputs.password);
    res.send(signIn);
  } catch (e) {
    console.log(e.error);
    res.status(404).json({ error: e });
  }
});
router.post("/signUp", async (req, res) => {
  try {
    console.log("break");
    let inputs = req.body.values;
    console.log(inputs.name, inputs.email, inputs.password);
    let signUp = await userData.createUser(
      inputs.name,
      inputs.email,
      inputs.password,
      0
    );
    console.log("here");
    console.log(signUp);
    res.send(signUp);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
});

router.post("/newProject", async (req, res) => {
  try {
    let inputs = req.body.values;
    console.log(inputs);
    let newProject = await projectData.createProject(
      inputs.title,
      inputs.description,
      inputs.dueDate
    );
    let addToUser = await userData.addProject(inputs.userId, newProject._id);
    console.log("added to user");
    res.send(newProject);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let user = await userData.getUser(id);
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
});

module.exports = router;
