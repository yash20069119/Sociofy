const express = require("express");
const userModel = require("../models/user");
require("dotenv").config();

const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();
const { increaseTrust, decreaseTrust } = require("../utils/trustScore");


router.put("/:id", authenticateUser, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { bio, profilePic } = req.body;

    const updateData = {};

    if (bio !== undefined) updateData.bio = bio;

    // Store Base64 directly as string
    if (profilePic) {
      updateData.profilePic = profilePic;
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(req.params.id, updateData, { new: true })
      .select("-password");

    res.json({ user: updatedUser });

  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});



// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find().select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST /api/users/:id/follow
router.post("/:id/follow", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;    
    const targetId = req.params.id;

    if (!targetId) return res.status(404).json({ message: "Target user not found" });

    const user = await userModel.findById(userId);
    if (user.following.includes(targetId)) {
      return res.status(400).json({ message: "Already following this user" });
    }

    if (user.following.length > 0 && user.following.length % 7 === 0) {
      await decreaseTrust(userId, 10);
    }

    await increaseTrust(userId, 1);

    await userModel.findByIdAndUpdate(userId, {
      $addToSet: { following: targetId }
    });

    await userModel.findByIdAndUpdate(targetId, {
      $addToSet: { followers: userId }
    });

    res.json({ message: "user followed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST /api/users/:id/unfollow
router.post("/:id/unfollow", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const targetId = req.params.id;
    if (!targetId) return res.status(404).json({ message: "Target user not found" });
    const user = await userModel.findById(userId);
    if (!user.following.includes(targetId)) {
      return res.status(400).json({ message: "Not following this user" });
    }

    await userModel.findByIdAndUpdate(userId, {
      $pull: { following: targetId }
    });

    await userModel.findByIdAndUpdate(targetId, {
      $pull: { followers: userId }
    });

    res.json({ message: "user unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;