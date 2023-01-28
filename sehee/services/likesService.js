const likesDao = require("../models/likesDao");

const likespost = async (postId, userId) => {
  const postLikes = await likesDao.postLikes(postId, userId);
  return postLikes;
};

module.exports = {
  likespost,
};
