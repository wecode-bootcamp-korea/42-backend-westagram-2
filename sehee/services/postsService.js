const postsDao = require("../models/postsDao");
const userDao = require("../models/userDao");
// 게시글 등록
const createPost = async (title, content, post_image, user_id) => {
  try {
    await postsDao.createPost(title, content, post_image, user_id);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    err.statusCode = 400;
    throw err;
  }
};

// 전체 게시글 조회
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

// 유저 게시글 조회
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

// 게시글 수정
const updatePost = async (postId, content) => {
  try {
    await postsDao.updatePost(postId, content);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    err.statusCode = 400;
    throw err;
  }
};
// 게시글 삭제
const deletePost = async (postId) => {
  try {
    await postsDao.deletePost(postId);
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
