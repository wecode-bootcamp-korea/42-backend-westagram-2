const postsDao = require("../models/postsDao");

// 게시글 등록
const createPost = async (title, content, post_image, user_id) => {
  return await postsDao.createPost(title, content, post_image, user_id);
};

// 전체 게시글 조회
const getPosts = async () => {
  return await postsDao.getPosts();
};

// 유저 게시글 조회
const getPostByUserId = async (userId) => {
  return await postsDao.getPostByUserId(userId);
};

// 게시글 수정
const updatePost = async (postId, content) => {
  return await postsDao.updatePost(postId, content);
};

// 게시글 삭제
const deletePost = async (postId) => {
  return await postsDao.deletePost(postId);
};

module.exports = {
  createPost,
  getPosts,
  getPostByUserId,
  updatePost,
  deletePost,
};
