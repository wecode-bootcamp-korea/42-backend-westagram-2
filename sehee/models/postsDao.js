const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
    appDataSource.destroy();
  });

//게시글 등록
const posting = async (title, content, post_image, user_id) => {
  return await appDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      post_image,
      user_id
    ) VALUES (?, ?, ?, ?);
    `,
    [title, content, post_image, user_id]
  );
};

// 게시글 조회
const postAll = async () => {
  return await appDataSource.query(
    `SELECT
    u.id AS usersId,
    u.profileImage AS userProfileImage,
    p.user_id AS posingId,
    p.post_image AS postingImageUrl,
    p.content AS postingContent
    FROM posts p INNER JOIN users u ON p.user_id = u.id;
    `
  );
};

// 유저 게시글 조회
const postUser = async (userId) => {
  return await appDataSource.query(
    `SELECT
    u.id AS userId,
    u.profileImage AS userProfileImage,
    JSON_ARRAYAGG(
    JSON_OBJECT('postingId', p.id,
    'postingImageUrl', p.post_image, 'postingContent', p.content))
      AS postings
    FROM users u
    INNER JOIN posts p
    ON u.id=p.user_id WHERE u.id= ${userId};`
  );
};

// 게시글 수정
const postUpdate = async (postId, content) => {
  await appDataSource.query(
    `UPDATE
    posts p
    SET p.content = ?
    WHERE p.id = ${postId};`,
    [content]
  );

  return await appDataSource.query(
    `SELECT
    u.id AS userId, u.name AS userName, p.id AS postingId, p.title AS postingTitle, p.content AS postingContent
    FROM posts p
    INNER JOIN users u
    ON u.id=p.user_id
    WHERE p.id = ${postId}`
  );
};

// 게시글 삭제
const postRemove = async (postId) => {
  return await appDataSource.query(
    `DELETE FROM posts
    WHERE posts.id = ${postId};`
  );
};

module.exports = {
  posting,
  postAll,
  postUser,
  postUpdate,
  postRemove,
};
