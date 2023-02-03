const likeDao = require("../models/likeDao");

const createLike = async (userId, postId) => {
  const creatingLike = await likeDao.creatingLike(userId, postId);
  return creatingLike;
};

module.exports = {
  createLike,
};
