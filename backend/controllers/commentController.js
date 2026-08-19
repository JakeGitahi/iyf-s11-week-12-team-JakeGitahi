const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comments = await Comment.find({ post: postId })
      .populate("author", "name")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Get comments error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment content is required",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      content: content.trim(),
      author: req.user._id,
      post: postId,
    });

    await comment.populate("author", "name");

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment: {
        id: comment._id,
        content: comment.content,
        author: {
          id: comment.author._id,
          name: comment.author.name,
        },
        post: comment.post,
        createdAt: comment.createdAt,
      },
    });
  } catch (error) {
    console.error("Create comment error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID",
      });
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this comment",
      });
    }

    await Comment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Delete comment error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getComments,
  createComment,
  deleteComment,
};