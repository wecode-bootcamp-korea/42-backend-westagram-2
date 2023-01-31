const { appDataSource } = require("./appDataSource");

//게시글 등록
const createPost = async (title, content, post_image, user_id) => {
  try {
    const data = await appDataSource.query(
      `INSERT INTO posts(
      title,
      content,
      post_image,
      user_id
    ) VALUES (?, ?, ?, ?);
    `,
      [title, content, post_image, user_id]
    );
    return data;
  } catch (err) {
    const data = new Error("DATA_IS_NOT_VAILD");
    err.statusCode = 500;
    throw err;
  }
};

// 게시글 조회
const getPosts = async () => {
  try {
    const data = await appDataSource.query(
      `SELECT
    u.id AS usersId,
    u.profileImage AS userProfileImage,
    p.user_id AS posingId,
    p.post_image AS postingImageUrl,
    p.content AS postingContent
    FROM posts p INNER JOIN users u ON p.user_id = u.id;
    `
    );
    return data;
  } catch (err) {
    const data = new Error("DATA_IS_NOT_VAILD");
    err.statusCode = 500;
    throw err;
  }
};

// 유저 게시글 조회
const getPostByUserId = async (userId) => {
  try {
    const data = await appDataSource.query(
      `SELECT
        u.id AS userId,
        u.profileImage AS userProfileImage,
        JSON_ARRAYAGG(
        JSON_OBJECT('postingId', p.id,
        'postingImageUrl', p.post_image, 'postingContent', p.content))
          AS postings
        FROM users u
        INNER JOIN posts p
        ON u.id=p.user_id WHERE u.id= ?;`,
      [userId]
    );

    return data;
  } catch (err) {
    const data = new Error("DATA_IS_NOT_VAILD");
    err.statusCode = 500;
    throw err;
  }
};

// 게시글 수정
const updatePost = async (postId, content) => {
  try {
    await appDataSource.query(
      `UPDATE
    posts p
    SET p.content = ?
    WHERE p.id = ${postId};`,
      [content]
    );
    const data = await appDataSource.query(
      `SELECT
        u.id AS userId, 
        u.name AS userName, 
        p.id AS postingId, 
        p.title AS postingTitle, 
        p.content AS postingContent
      FROM posts p
      INNER JOIN users u
      ON u.id=p.user_id
      WHERE p.id = ${postId}`
    );
    if (!data.affectedRows) {
      throw new Error("INVALID_DATA_INPUT");
    }
  } catch (err) {
    const data = new Error("DATA_IS_NOT_VAILD");
    err.statusCode = 500;
    throw err;
  }
};

// 게시글 삭제
const deletePost = async (postId) => {
  try {
    const data = await appDataSource.query(
      `DELETE FROM posts
    WHERE posts.id = ${postId};`
    );
    if (!data.affectedRows) {
      throw new Error("NO_DATA");
    }
  } catch (err) {
    const data = new Error("DATA_IS_NOT_VAILD");
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostByUserId,
  updatePost,
  deletePost,
  // checkIfUserExistsOrNot,
};
