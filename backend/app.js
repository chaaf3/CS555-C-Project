const express = require("express");
const configRoutes = require("./routes");
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


