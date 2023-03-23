// TODO:
// Add error checking functions and refactor code
const { ObjectId } = require("mongodb");

const checkId = (id) => {
  if (!id) {
    throw "Please provide an id";
  }
  if (typeof id != "string") {
    throw "id must be a string";
  }
  id = id.trim();
  if (id.length === 0) {
    throw "id must not be an empty string";
  }
  if (!ObjectId.isValid(id)) {
    throw "Invalid objectId";
  }
};

const checkTextValue = (value) => {
  if (!value) {
    throw "Please provide a value";
  }
  if (typeof value != "string") {
    throw "Please provide a text value";
  }
  value = value.trim();
  if (value.length < 1) {
    throw "Please provide a non-empty string";
  }
};

const checkForValue = (value) => {
  if (!value) {
    throw "Please provide a value";
  }
};

module.exports = {
  checkId,
  checkForValue,
  checkTextValue,
};
