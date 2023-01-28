const postsService = require("../services/postsService");

// 게시글 등록
const posting = async (req, res) => {
  const { title, content, post_image, user_id } = req.body;

  await postsService.posting(title, content, post_image, user_id);
  return res.status(201).json({ message: "postCreated" });
};

// 전체 게시글 조회
const postAll = async (req, res) => {
  const posts = await postsService.postAll();
  res.status(200).json({ data: posts });
};

// 유저 게시글 조회
const postUser = async (req, res) => {
  const { userId } = req.params;
  const postId = await postsService.postUser(userId);
  return res.status(200).json({ data: postId });
};

// 게시글 수정
const postUpdate = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  await postsService.postUpdate(postId, content);
  return res.status(200).json({ data: "updatePost" });
};

// 게시글 삭제
const postRemove = async (req, res) => {
  const { postId } = req.params;
  await postsService.postRemove(postId);
  return res.status(200).json({ message: "postingDeleted" });
};

module.exports = {
  posting,
  postAll,
  postUser,
  postUpdate,
  postRemove,
};
