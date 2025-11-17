const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  profilePic: {
    type: String,
  },
  bio: String,
  password: String,

  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
