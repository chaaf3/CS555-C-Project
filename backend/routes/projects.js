const express = require("express");
const router = express.Router();
const data = require("../data");
const projectData = data.projects;
// const validation = require("../validation");

router.get("/:projectId", async (req, res) => {
  try {
    let id = req.params.projectId;
    console.log(id);
    let project = await projectData.getProject(id);
    console.log(project);
    res.send(project);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

module.exports = router;
