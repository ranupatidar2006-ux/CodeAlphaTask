const User = require("../models/user");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.followUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user);

    if (!targetUser.followers.includes(req.user)) {
      targetUser.followers.push(req.user);
      currentUser.following.push(req.params.id);

      await targetUser.save();
      await currentUser.save();
    }

    res.json({ message: "Followed successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user);

    targetUser.followers.pull(req.user);
    currentUser.following.pull(req.params.id);

    await targetUser.save();
    await currentUser.save();

    res.json({ message: "Unfollowed successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
};