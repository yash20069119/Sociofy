const User = require("../models/user");

async function increaseTrust(userId, amount = 1) {
  try {
    await User.findByIdAndUpdate(userId, { $inc: { trustScore: amount } });
  } catch (err) {
    console.error("Error increasing trustScore:", err);
  }
}

async function decreaseTrust(userId, amount = 5) {
  try {
    await User.findByIdAndUpdate(userId, { $inc: { trustScore: -amount } });
  } catch (err) {
    console.error("Error decreasing trustScore:", err);
  }
}

module.exports = { increaseTrust, decreaseTrust };
