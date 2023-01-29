const likeDao = require('../models/likeDao');

const createLike = async (postId, userId) => {
  const makeLike = await likeDao.makeLike(postId, userId);
  return makeLike;
};

module.exports = {
  createLike,
};
