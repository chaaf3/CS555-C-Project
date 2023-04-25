const express = require("express");
const router = express.Router();
const data = require("../data");
const contractorData = data.contractors;
// const validation = require("../validation");
router.post("/images", async (req, res) => {
  try {
    console.log("break");

    let image = req.body;
    console.log(image);
    let answer = await contractorData.addImage(
      "6423ab71b18ce2f0289517a0",
      image
    );

    res.send(answer);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.get("/images", async (req, res) => {
  try {
    let something = await contractorData.getContractor(
      "6423ab71b18ce2f0289517a0"
    );
    res.send(something.image);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.get("/queue/:contractorId", async (req, res) => {
  try {
    let id = req.params.contractorId;
    let queue = await contractorData.getQueue(id);
    res.send(queue);
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

module.exports = router;
