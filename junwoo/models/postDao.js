const { appDataSource } = require("./dbconfig.js");

const createPost = async (title, content, image, user_id) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts (
        title,
        content,
        image_url,
        user_id
        ) VALUE (?,
          ?,
          ?,
          ?);`,
      [title, content, image, user_id]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const usersPosting = async (userId) => {
  console.log(userId);

  return await appDataSource.query(
    `SELECT
      u.id AS userId,
      u.profileImage AS userProfileImage,
      p.id AS postingId,
      p.image_url AS postingImageUrl,
      p.content AS postingContent
    FROM users u INNER JOIN posts p on u.id = ?`,
    [userId]
  );
};

const usersPosting2 = async (userId) => {
  console.log(userId);
  return await appDataSource.query(
    `SELECT
      u.id AS userId,
      u.profileImage AS userProfileImage,
      JSON_ARRAYAGG(JSON_OBJECT('postingId',p.id,'postingImgageUrl',p.image_url,'postingContent',p.content)) AS postings 
    FROM users u
    INNER JOIN posts p ON u.id = ? WHERE u.id = p.user_id GROUP BY p.user_id`,
    [userId]
  );
};

const postModifing = async (userId, postId, content) => {
  const update = await appDataSource.query(
    `UPDATE posts p, users u
  SET
    p.content = ?
    WHERE p.id = ? AND u.id = ?
  `,
    [content, postId, userId]
  );

  const select = await appDataSource.query(
    `SELECT
      u.id AS userID,
      u.name AS userName,
      p.id AS postingId,
      p.title AS postingTitle,
      p.content AS postingContent
      FROM users u
      INNER JOIN posts p ON u.id = ? AND p.id = ?
    `,
    [userId, postId]
  );
  return select;
};

const postDeleting = async (postId) => {
  return await appDataSource.query(
    `DELETE FROM posts
    WHERE posts.id = ?
    `,
    [postId]
  );
};

module.exports = {
  createPost,
  usersPosting,
  usersPosting2,
  postModifing,
  postDeleting,
};
