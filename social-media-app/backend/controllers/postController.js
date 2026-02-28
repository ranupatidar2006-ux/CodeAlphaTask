const Post = require("../models/post");

exports.createPost = async (req, res) => {
  const { caption } = req.body;

  const post = await Post.create({
    user: req.user._id,
    caption,
    image: req.file ? req.file.filename : null,
  });

  res.json(post);
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.includes(req.user)) {
      post.likes.pull(req.user);
    } else {
      post.likes.push(req.user);
    }

    await post.save();
    res.json(post);

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });

  } catch (err) {
    res.status(500).json(err);
  }
};