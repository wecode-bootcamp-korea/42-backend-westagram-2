const postDao = require('../models/postDao');

const posting = async (postImage, content, title, userId) => {
  const createPost = await postDao.createPost(
    postImage,
    content,
    title,
    userId
  );
  return createPost;
};

const postlist = async () => {
  const getPostlist = await postDao.getPostlist();
  return getPostlist;
};

const userPostlist = async (userId) => {
  const getUserPost = await postDao.getUserPost(userId);
  return getUserPost;
};

const patchPost = async (postId, content, userId) => {
  const updatePost = await postDao.updatePost(postId, content, userId);
  return updatePost;
};

const deletePost = async (postId, userId) => {
  const removePost = await postDao.removePost(postId, userId);
  return removePost;
};

module.exports = {
  posting,
  postlist,
  userPostlist,
  patchPost,
  deletePost,
};
