const express = require("express");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post");
const userModel = require("../models/user");
require("dotenv").config();

const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();






router.post("/", authenticateUser, async (req, res) => {
  try {
    const { image, caption } = req.body;
    if (!image) return res.status(400).json({ message: "Image is required" });

    const newPost = await postModel.create({
      user: req.user.id, 
      image,
      caption,
      createdAt: new Date()
    });

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating post" });
  }
});


router.get("/", async (req, res) => {
  try {
    const posts = await postModel.find().populate("user", "name email profilePic").populate("comments.user", "name email profilePic").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", err });
  }
});


router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await postModel
      .find({ user: userId })
      .populate("user", "name email profilePic")
      .populate("comments.user", "name email profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user's posts" });
  }
});



router.post("/:postId/like", authenticateUser, async (req, res) => {
  try {
    const post = await postModel.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike
      post.likes.pull(userId);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();
    res.json({ likesCount: post.likes.length, liked: !isLiked });
  } catch (err) {
    res.status(500).json({ message: "Error liking post", err });
  }
});


router.post("/:postId/comment", authenticateUser, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Comment text required" });

    const post = await postModel.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      user: req.user.id,
      text,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    const populatedPost = await postModel.findById(post._id)
      .populate("user", "name email")
      .populate("comments.user", "name email");

    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ message: "Error adding comment", err });
  }
});




module.exports = router;
