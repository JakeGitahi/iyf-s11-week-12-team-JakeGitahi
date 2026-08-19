const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, content, author, category } = req.body;

    const post = await Post.create({
      title,
      content,
      author,
      category,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({
      message: "Invalid post ID",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content, author, category } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        author,
        category,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update post",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid post ID",
      error: error.message,
    });
  }
});

module.exports = router;