const express = require("express");
const router = express.Router();
const data = require("../data");
const contractorData = data.contractors;
// const validation = require("../validation");
router.post("/images", async (req, res) => {
  try {
    let image = req.body.values;
    let id = req.body.values.id;
    let answer = await contractorData.addImage(id, image);
    res.send(answer);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.get("/images:id", async (req, res) => {
  try {
    let something = await contractorData.getContractor(req.params.id);
    res.send(something.image.images);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.get("/todo/:contractorId", async (req, res) => {
  try {
    let id = req.params.contractorId;
    let todo = await contractorData.getProjectsToDo(id);
    res.send(todo);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});
router.get("/in_progress/:contractorId", async (req, res) => {
  try {
    let id = req.params.contractorId;
    let inProgress = await contractorData.getInProgress(id);
    res.send(inProgress);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});
router.get("/start_next_task/:contractorId", async (req, res) => {
  try {
    let id = req.params.contractorId;
    let res = await contractorData.startNextTaskInQueue(id);
    res.send(res);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.post("/signUp", async (req, res) => {
  try {
    let inputs = req.body.values;
    console.log(inputs.name, inputs.email, inputs.password);
    let signUp = await contractorData.createContractor(
      inputs.name,
      inputs.email,
      inputs.password
    );
    console.log("here");
    res.send(signUp);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
});

router.post("/signIn", async (req, res) => {
  try {
    let inputs = req.body.values;
    console.log(inputs);
    let signIn = await contractorData.checkContractor(
      inputs.email,
      inputs.password
    );
    res.send(signIn);
  } catch (e) {
    console.log(e.error);
    res.status(404).json({ error: e });
  }
});

module.exports = router;
