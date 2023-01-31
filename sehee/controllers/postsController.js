const postsService = require("../services/postsService");

// 게시글 등록
const createPost = async (req, res) => {
  try {
    const { title, content, post_image, user_id } = req.body;
    if (!title || !content || !post_image || !user_id) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await postsService.createPost(title, content, post_image, user_id);
    return res.status(201).json({ message: "postCreated" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 전체 게시글 조회
const getPosts = async (req, res) => {
  try {
    const posts = await postsService.getPosts();
    res.status(200).json({ data: posts });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 유저 게시글 조회
const getPostByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const postUserId = await postsService.getPostByUserId(userId);
    return res.status(200).json({ data: postUserId });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 게시글 수정
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    if (!postId || !content) {
      return res.status(400).json({ message: "INVALID_DATA_INPUT" });
    }
    await postsService.updatePost(postId, content);
    return res.status(200).json({ data: "updatePost" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 게시글 삭제
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await postsService.deletePost(postId);
    return res.status(200).json({ message: "postingDeleted" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostByUserId,
  updatePost,
  deletePost,
};
