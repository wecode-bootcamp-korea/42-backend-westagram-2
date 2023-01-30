const postDao = require('../models/postDao');

const createPost = async (postImage, content, title, userId) => {
  return await postDao.createPost(postImage, content, title, userId);
};

const getPosts = async () => {
  return await postDao.getPosts();
};

const getPostsByUserId = async (userId) => {
  return await postDao.getPostsByUserId(userId);
};

const patchPost = async (postId, content, userId) => {
  return await postDao.updatePost(postId, content, userId);
};

const deletePost = async (postId, userId) => {
  return await postDao.removePost(postId, userId);
};

module.exports = {
  createPost,
  getPosts,
  getPostsByUserId,
  patchPost,
  deletePost,
};
