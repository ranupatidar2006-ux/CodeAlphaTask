const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createPost, getAllPosts, likePost, deletePost } = require("../controllers/postController");
const upload = require("../middleware/upload");

router.post("/create", protect, upload.single("image"), createPost);
router.post("/create", auth, createPost);
router.get("/all", auth, getAllPosts);
router.put("/like/:id", auth, likePost);
router.delete("/delete/:id", auth, deletePost);

module.exports = router;