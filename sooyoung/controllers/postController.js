const postService = require('../services/postService');
const { checkError } = require('../middleware/errorHandler');

const createPost = checkError(async (req, res) => {
  const { postImage, content, title } = req.body;

  if (!postImage || !title) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }
  await postService.createPost(postImage, content, title, req.user);

  res.status(201).json({ message: 'postCreated' });
});

const getPosts = checkError(async (req, res) => {
  const postlist = await postService.getPosts();

  res.status(200).json({ data: postlist });
});

const getPostsByUserId = checkError(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'USERID_ERROR' });
  }

  const userPostlist = await postService.getPostsByUserId(userId);

  res.status(200).json({ data: userPostlist });
});

const patchPost = checkError(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  if (!postId || !content) {
    return res.status(400).json({ message: 'KEY_ERROR' });
  }

  const patchPost = await postService.patchPost(postId, content, req.user);

  res.status(200).json({ data: patchPost });
});

const deletePost = checkError(async (req, res) => {
  const { postId } = req.params;

  await postService.deletePost(postId, req.user);

  res.status(200).json({ message: 'postingDeleted' });
});

module.exports = {
  createPost,
  getPosts,
  getPostsByUserId,
  patchPost,
  deletePost,
};
