const postDao = require("../models/postDao");

const postUp = async (title, content, image, user_id) => {
  const createPost = await postDao.createPost(title, content, image, user_id);
  return createPost;
};

const usersPost = async (userId) => {
  const usersPosting = await postDao.usersPosting(userId);
  return usersPosting; // == [ {}, {}, {} ]
};

const postOfUser = async (userId) => {
  const usersPosting2 = await postDao.usersPosting2(userId);
  return usersPosting2;
};

const postModified = async (userId, postId, content) => {
  const postModifing = await postDao.postModifing(userId, postId, content);
  return postModifing;
};

const postDeleted = async (postId) => {
  const postDeleting = await postDao.postDeleting(postId);
  return postDeleting;
};

module.exports = {
  postUp,
  usersPost,
  postOfUser,
  postModified,
  postDeleted,
};
