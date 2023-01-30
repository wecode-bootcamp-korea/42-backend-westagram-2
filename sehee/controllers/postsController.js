const postsService = require("../services/postsService");

// 게시글 등록
const createPost = async (req, res) => {
  const { title, content, post_image, user_id } = req.body;

  await postsService.createPost(title, content, post_image, user_id);
  return res.status(201).json({ message: "postCreated" });
};

// 전체 게시글 조회
const getPosts = async (req, res) => {
  const posts = await postsService.getPosts();
  res.status(200).json({ data: posts });
};

// 유저 게시글 조회
const getPostByUserId = async (req, res) => {
  const { userId } = req.params;
  const postUserId = await postsService.getPostByUserId(userId);
  return res.status(200).json({ data: postUserId });
};

// 게시글 수정
const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  await postsService.updatePost(postId, content);
  return res.status(200).json({ data: "updatePost" });
};

// 게시글 삭제
const deletePost = async (req, res) => {
  const { postId } = req.params;
  await postsService.deletePost(postId);
  return res.status(200).json({ message: "postingDeleted" });
};

module.exports = {
  createPost,
  getPosts,
  getPostByUserId,
  updatePost,
  deletePost,
};
