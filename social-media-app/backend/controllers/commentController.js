const Comment = require("../models/comment");

exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({
      post: req.body.postId,
      user: req.user,
      text: req.body.text
    });

    const savedComment = await comment.save();
    res.status(201).json(savedComment);

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (err) {
    res.status(500).json(err);
  }
};