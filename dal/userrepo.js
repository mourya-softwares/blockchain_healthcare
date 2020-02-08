const UserModel = require("../models/mongoose/usermodel");

exports.authenticateUser = async function(username, password) {
  try {
    let result = await UserModel.findOne({
      username: username,
      password: password
    });
    if (!result || result.errors || !result.name) {
      return { success: false, message: "invalid credentials" };
    }
    return {
      success: true,
      name: result.name,
      id: result.userId,
      role: result.role,
      username: result.username
    };
  } catch (err) {
    return { success: false, message: "error occured", error: err };
  }
};

exports.registerUser = async function({ name, username, password, role = 2 }) {
  let userModel = new UserModel({
    userId: Date.now(),
    name: name,
    username: username,
    password: password,
    role: role
  });
  let result = await userModel.save();
  if (result.errors)
    return {
      success: false,
      error: result.errors,
      message: "Unable to register user!"
    };
  return {
    success: true,
    name: name
  };
};

exports.getAllUsersByRole = async function(role) {
  let results = await UserModel.find({ role: role });
  if (results.errors || results.length == 0) {
    return { success: false, message: "error occured", error: results.errors };
  }
  return { success: true, users: results };
};
