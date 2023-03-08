const express = require("express");
const router = express.Router();
const data = require("../data");
const contractorData = data.contractors;
// const validation = require("../validation");

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
