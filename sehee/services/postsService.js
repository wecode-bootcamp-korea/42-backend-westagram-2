const postsDao = require("../models/postsDao");
const userDao = require("../models/userDao");

const createPost = async (title, content, postImage, userId) => {
  try {
    return await postsDao.createPost(title, content, postImage, userId);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    err.statusCode = 400;
    throw err;
  }
};

const getPosts = async () => {
  try {
    const posts = await postsDao.getPosts();
    return posts;
  } catch (err) {
    const posts = new Error("INVALID_DATA");
    err.statusCode = 500;
    throw err;
  }
};

const getPostByUserId = async (userId) => {
  try {
    const user = await userDao.checkIfUserExistsOrNot(userId);
    if (parseInt(user) === 0) {
      throw new Error("INVALID_USER_ID");
    }

    const posts = await postsDao.getPostByUserId(userId);

    return posts;
  } catch (err) {
    const posts = new Error("INVALID_DATA");
    err.statusCode = 400;
    throw err;
  }
};

const updatePost = async (postId, content) => {
  try {
    return await postsDao.updatePost(postId, content);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    err.statusCode = 400;
    throw err;
  }
};

const deletePost = async (postId) => {
  try {
    return await postsDao.deletePost(postId);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostByUserId,
  updatePost,
  deletePost,
};
