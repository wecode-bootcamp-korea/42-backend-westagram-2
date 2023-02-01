const postsService = require("../services/postsService");

const createPost = async (req, res) => {
  try {
    const { title, content, postImage, userId } = req.body;
    if (!title || !content || !postImage || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await postsService.createPost(title, content, postImage, userId);
    return res.status(201).json({ message: "postCreated" });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postsService.getPosts();
    res.status(200).json({ data: posts });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPostByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const postUserId = await postsService.getPostByUserId(userId);
    return res.status(200).json({ data: postUserId });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

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
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await postsService.deletePost(postId);
    return res.status(200).json({ message: "postingDeleted" });
  } catch (err) {
    console.error(err);
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
