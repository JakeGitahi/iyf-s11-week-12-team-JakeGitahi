const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/commentController");

router.get("/posts/:postId/comments", getComments);

router.post("/posts/:postId/comments", protect, createComment);

router.delete("/comments/:id", protect, deleteComment);

module.exports = router;