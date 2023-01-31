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
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const getHashedPassword = async (email) => {
  try {
    const [hashedPassword] = await appDataSource.query(
      `SELECT password
        FROM users
        WHERE email = ?;
      `,
      [email]
    );
    return hashedPassword.password;
  } catch (err) {
    const error = new Error('INVALID_EMAIL_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const getUserId = async (email) => {
  try {
    const [userId] = await appDataSource.query(
      `SELECT id 
        FROM users
        WHERE email = ?;
      `,
      [email]
    );
    return userId.id;
  } catch (err) {
    const error = new Error('FAIL_TO_GET_USERID');
    error.statusCode = 500;
  }
};

module.exports = {
  createUser,
  getHashedPassword,
  getUserId,
};
