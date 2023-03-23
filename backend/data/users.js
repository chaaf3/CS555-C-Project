const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const projects = mongoCollections.projects;
const contractors = mongoCollections.contractors;
const { ObjectId } = require("mongodb");
const data = require(".");

const createUser = async (name, email) => {
    validation.checkForValue(name);
    validation.checkForValue(email);

    const userCollection = await users();
    let newUser = {
        name: name,
        email: email,
        messages: [],
        calendar: [],
        status: []
    };
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) {
        throw "Could not add user";
    }
    const newId = insertInfo.insertedId;
    return newId;
}

const getUser = async (id) => {
    validation.checkId(id);
    
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(id)});
    if (user === null) {
        throw "No user with that id found";
    }
    user._id = user._id.toString();
    return user;
}

const addMessage = async (userId, message) => {
}

// Messages and calendar code can be reused from contractors.js

module.exports = { 
    createUser,
    getUser,
    addMessage
}

