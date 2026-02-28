const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getUser, followUser, unfollowUser } = require("../controllers/userController");

router.get("/:id", auth, getUser);
router.put("/follow/:id", auth, followUser);
router.put("/unfollow/:id", auth, unfollowUser);

module.exports = router;