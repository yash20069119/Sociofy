const express = require("express");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post");
const userModel = require("../models/user");
require("dotenv").config();

const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

const { increaseTrust, decreaseTrust } = require("../utils/trustScore");
const { requireTrust } = require("../middleware/trustMiddleware");

const POST_COOLDOWN_TIME = 10000; 
const COMMENT_COOLDOWN_TIME = 30000; 
const DUPLICATE_COMMENT_PENALTY = 5;
const SPAM_POST_PENALTY = 5; 
const pendingRequests = new Map();

router.post("/", authenticateUser, requireTrust, async (req, res) => {
  const lastPost = await postModel
    .findOne({ user: req.user.id })
    .sort({ createdAt: -1 });

  if (lastPost && Date.now() - lastPost.createdAt < POST_COOLDOWN_TIME) {
    await decreaseTrust(req.user.id, SPAM_POST_PENALTY);
    return res.status(429).json({ message: "Posting too fast" });
  }

  await increaseTrust(req.user.id, 1);

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
            alert(err.response?.data?.message || "Failed to load posts");

    console.error(err);
    res.status(500).json({ message: "Error creating post" });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await postModel.find().populate("user", "name email profilePic").populate("comments.user", "name email profilePic").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
            alert(err.response?.data?.message || "Failed to load posts");

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
            alert(err.response?.data?.message || "Failed to load posts");

    console.error(err);
    res.status(500).json({ message: "Error fetching user's posts" });
  }
});

router.post("/:postId/like", authenticateUser, requireTrust, async (req, res) => {
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
            alert(err.response?.data?.message || "Failed to load posts");

    res.status(500).json({ message: "Error liking post", err });
  }
});

router.post("/:postId/comment", authenticateUser, requireTrust, async (req, res) => {
  const requestKey = `${req.user.id}-${req.params.postId}-${req.body.text}`;
  
  if (pendingRequests.has(requestKey)) {
    return res.status(429).json({ message: "Request already processing" });
  }

  pendingRequests.set(requestKey, true);

  try {
    const { text } = req.body;
    if (!text) {
      pendingRequests.delete(requestKey);
      return res.status(400).json({ message: "Comment text required" });
    }

    const post = await postModel.findById(req.params.postId);
    if (!post) {
      pendingRequests.delete(requestKey);
      return res.status(404).json({ message: "Post not found" });
    }

    const userComments = post.comments.filter(comment => 
      comment.user.toString() === req.user.id
    );
    
    const lastUserComment = userComments.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )[0];

    if (lastUserComment && Date.now() - new Date(lastUserComment.createdAt) < COMMENT_COOLDOWN_TIME) {
      await decreaseTrust(req.user.id, SPAM_POST_PENALTY);
      pendingRequests.delete(requestKey);
      return res.status(429).json({ message: "Commenting too fast" });
    }

    const duplicateComment = post.comments.find(
      comment => comment.user.toString() === req.user.id && comment.text === text
    );

    if (duplicateComment) {
      await decreaseTrust(req.user.id, DUPLICATE_COMMENT_PENALTY);
      pendingRequests.delete(requestKey);
      return res.status(400).json({ message: "Duplicate comment detected" });
    }

    await increaseTrust(req.user.id, 1);

    post.comments.push({
      user: req.user.id,
      text,
      createdAt: new Date()
    });

    await post.save();

    const populatedPost = await postModel.findById(post._id)
      .populate("user", "name email")
      .populate("comments.user", "name email");

    res.status(201).json(populatedPost);
  } catch (err) {
            alert(err.response?.data?.message || "Failed to load posts");

    res.status(500).json({ message: "Error adding comment", err });
  } finally {
    pendingRequests.delete(requestKey);
  }
});

module.exports = router;