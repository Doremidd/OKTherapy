const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID:{ type: String, required: true },
  userName: { type: String, required: true },
  age: { type: Number, required: false },
  gender: { type: String, required: false },
  sexuality: { type: String, required: false },
  location: { type: String, required: false },
  budget: { type: [Number], required: false },
  therapyMode: { type: String, required: false },
  therapyFocus: { type: [String], required: false },
  therapistGender: { type: String, required: false },
  therapyMethods: { type: [String], required: false },
  certification: { type: [String], required: false },
  matchedTherapists: { type: [Object], required: false },
});

const User = mongoose.model("Users", userSchema, "Users");

module.exports = User;
