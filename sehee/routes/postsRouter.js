const express = require("express");
const postsController = require("../controllers/postsController");

const router = express.Router();

// 게시글 등록
router.post("/posting", postsController.createPost);

// 전체 게시글 조회
router.get("/list", postsController.getPosts);

// 유저 게시글 조회
router.get("/list/:userId", postsController.getPostByUserId);

// 게시글 수정
router.put("/:postId", postsController.updatePost);

// 게시글 삭제
router.delete("/:postId", postsController.deletePost);

module.exports = {
  router,
};
