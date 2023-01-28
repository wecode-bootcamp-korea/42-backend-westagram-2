const postsDao = require("../models/postsDao");

// 게시글 등록
const posting = async (title, content, post_image, user_id) => {
  return await postsDao.posting(title, content, post_image, user_id);
};

// 전체 게시글 조회
const postAll = async () => {
  return await postsDao.postAll();
};

// 유저 게시글 조회
const postUser = async (userId) => {
  return await postsDao.postUser(userId);
};

// 게시글 수정
const postUpdate = async (postId, content) => {
  return await postsDao.postUpdate(postId, content);
};

// 게시글 삭제
const postRemove = async (postId) => {
  return await postsDao.postRemove(postId);
};

module.exports = {
  posting,
  postAll,
  postUser,
  postUpdate,
  postRemove,
};
