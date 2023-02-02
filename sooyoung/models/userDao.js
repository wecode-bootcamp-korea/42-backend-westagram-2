const { appDataSource } = require('./dbEnvironment');

const createUser = async (username, email, profileImage, password) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users (
        username, 
        email, 
        profile_image,
        password
      ) VALUES (?, ?, ?, ?);
      `,
      [username, email, profileImage, password]
    );
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const isUserIdExist = async (userId) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT EXISTS (
        SELECT id
        FROM users
        WHERE users.id = ?
      ) as registerd
      `,
      [userId]
    );
    return parseInt(result.registerd);
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [user] = await appDataSource.query(
      `SELECT 
        id, 
        email, 
        password, 
        profile_image
      FROM users
      WHERE email = ?;
      `,
      [email]
    );

    return user;
  } catch (err) {
    console.log(err);
    const error = new Error('FAIL_TO_GET_USERID');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  isUserIdExist,
  getUserByEmail,
};
