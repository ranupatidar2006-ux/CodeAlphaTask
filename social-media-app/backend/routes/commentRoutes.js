const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createComment, getPostComments } = require("../controllers/commentController");

router.post("/create", auth, createComment);
router.get("/:postId", auth, getPostComments);

module.exports = router;