const { appDataSource } = require("./dbconfig.js");

const createLike = async (userId, postId) => {
  return await appDataSource.query(
    `INSERT INTO likes(
      user_id,
      post_id
    ) VALUES(
      ?,
      ?);`,
    [userId, postId]
  );
};

module.exports = {
  createLike,
};
