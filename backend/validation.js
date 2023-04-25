// TODO:
// Add error checking functions and refactor code
const { ObjectId } = require("mongodb");

const checkNumOfArgs = function checkNumOfArgs(args, numArgsLow, numArgsHigh) {
  if(args.length < numArgsLow || args.length > numArgsHigh) throw (numArgsLow == numArgsHigh)
   ? ((numArgsLow == 1) 
      ? `Error: Exactly ${numArgsLow} argument must be provided.`
      : `Error: Exactly ${numArgsLow} arguments must be provided.`)
   : `Error: Number of arguments must be between ${numArgsLow} and ${numArgsHigh} (inclusive).`;
};

const checkIsProper = function checkIsProper (val, varType, variableName) {
  if(!val) throw `Error: ${variableName || 'Variable'} is not defined.`;
  // Check parameter type is correct (also checks if its defined)
  if (typeof val != varType) throw `Error: ${variableName || 'provided variable'} must be a ${varType}.`;

  // Also required to catch NaNs since theyre technically type 'number'
  if (varType == 'number' && isNaN(val)) throw `Error: ${variableName || 'provided variable'} must not be NaN.`;
  
  // For strings, check if trimmed string is empty
  if(varType == 'string' && val.trim().length < 1) throw (1 == 1)
   ? `Error: Trimmed ${variableName || 'provided variable'} cannot be empty.`
   : `Error: Trimmed ${variableName || 'provided variable'} must be at least ${length} characters long.`;
};

const checkId = function checkId(id, varName) {
  if (!id) throw `Error: You must provide a ${varName}`;
  if (typeof id !== 'string') throw `Error: ${varName} must be a string`;
  id = id.trim();
  if (id.length === 0)
    throw `Error: ${varName} cannot be an empty string or just spaces`;
  
  // apparently this is a better check than ObjectId.isValid(), according to
  // https://stackoverflow.com/questions/13850819/can-i-determine-if-a-string-is-a-mongodb-objectid
  if(id != new ObjectId(id)) throw `Error: ID is not a valid ObjectId.`;
  
  return id;
};

const checkPassword = function checkPassword(password) {
  if(password.length < 6) throw `Error: Password must be at least 6 characters.`;
  // https://www.geeksforgeeks.org/check-if-a-string-contains-uppercase-lowercase-special-characters-and-numeric-values/#:~:text=Traverse%20the%20string%20character%20by,it%20is%20a%20lowercase%20letter.
  let pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
  );
  if(!pattern.test(password)) throw `Error: Password must contain at least one lowercase letter, one uppercase letter, one number and one special character.`
}

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
  checkNumOfArgs,
  checkIsProper,
  checkId,
  checkPassword,
  checkForValue,
  checkTextValue,
};
