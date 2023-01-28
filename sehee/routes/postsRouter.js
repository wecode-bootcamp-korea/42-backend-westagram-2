const express = require("express");
const postsController = require("../controllers/postsController");

const router = express.Router();

// 게시글 등록
router.post("/posting", postsController.posting);

// 전체 게시글 조회
router.get("/list", postsController.postAll);

// 유저 게시글 조회
router.get("/list/:userId", postsController.postUser);

// 게시글 수정
router.put("/update/:postId", postsController.postUpdate);

// 게시글 삭제
router.delete("/remove/:postId", postsController.postRemove);

module.exports = {
  router,
};
