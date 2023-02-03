const express = require("express");
const postController = require("../controllers/postController.js");

const router = express.Router();

router.post("/", postController.postUp);
router.get("/:userId", postController.usersPost);
router.get("/users/:userId", postController.postOfUser);
router.patch("/:userId/:postId", postController.postModified);
router.delete("/:postId", postController.postDeleted);

module.exports = {
  router,
};
