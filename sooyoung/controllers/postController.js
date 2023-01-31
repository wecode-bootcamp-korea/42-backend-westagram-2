const postService = require('../services/postService');

const createPost = async (req, res) => {
  try {
    const { postImage, content, title, userId } = req.body;

    if (!postImage || !title || !userId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    await postService.createPost(postImage, content, title, userId);

    res.status(201).json({ message: 'postCreated' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const postlist = await postService.getPosts();

    res.status(200).json({ data: postlist });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'USERID_ERROR' });
    }

    const userPostlist = await postService.getPostsByUserId(userId);

    res.status(200).json({ data: userPostlist });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const patchPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, userId } = req.body;

    if (!postId || !content || !userId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const patchPost = await postService.patchPost(postId, content, userId);

    res.status(200).json({ data: patchPost });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    await postService.deletePost(postId, userId);

    res.status(200).json({ message: 'postingDeleted' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostsByUserId,
  patchPost,
  deletePost,
};
