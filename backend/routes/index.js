const contractorRoutes = require("./contractors");
const projectRoutes = require("./projects");
const userRoutes = require("./users");

// not much to do here
const constructorMethod = (app) => {
  app.use("/contractors", contractorRoutes);
  app.use("/project", projectRoutes);
  app.use("/users", userRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
