const express = require("express");
const postsController = require("../controllers/postsController");

const router = express.Router();

router.post("/", postsController.createPost);
router.get("/", postsController.getPosts);
router.get("/:userId", postsController.getPostByUserId);
router.put("/:postId", postsController.updatePost);
router.delete("/:postId", postsController.deletePost);

module.exports = {
  router,
};
