const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('', postController.posting); //게시물 등록
router.get('/lists', postController.postlist); //전체 게시물 조회
router.get('/user/:userId', postController.userPostlist); //유저의 게시물 조회
router.patch('/:postId', postController.patchPost); //게시물 수정
router.delete('/:postId', postController.deletePost); //게시물 삭제

module.exports = {
  router,
};
