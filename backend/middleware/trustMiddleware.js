const User = require("../models/user");

async function requireTrust(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select("trustScore");

    if (!user) return res.status(401).json({ message: "User not found" });

    if (user.trustScore < 20) {
      return res.status(403).json({
        message: "Your trust score is too low!"
      });
    }

    next();
  } catch (err) {
    alert(err.response?.data?.message || "Failed to load posts");
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { requireTrust };
