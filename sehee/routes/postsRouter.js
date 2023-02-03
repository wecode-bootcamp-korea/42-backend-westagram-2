const express = require("express");
const postsController = require("../controllers/postsController");
const { validateToken } = require("../middleware/auth");
const router = express.Router();

router.post("/", validateToken, postsController.createPost);
router.get("/", postsController.getPosts);
router.get("/:userId", postsController.getPostByUserId);
router.put("/:postId", validateToken, postsController.updatePost);
router.delete("/:postId", validateToken, postsController.deletePost);

module.exports = {
  router,
};
