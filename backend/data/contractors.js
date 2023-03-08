const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");

const helloWorld = function helloWorld() {
  console.log("Hello world");
};

module.exports = {
  helloWorld,
};
