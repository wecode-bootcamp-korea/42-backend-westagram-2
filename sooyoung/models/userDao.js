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
    console.log(err);
    const error = new Error('INVALID_EMAIL_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const isUserIdExist = async (userId) => {
  try {
    const [userIdExist] = await appDataSource.query(
      `SELECT id
        FROM users
        WHERE users.id = ?;  
      `,
      [userId]
    );
    return userIdExist;
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw err;
  }
};

const getUserIdByEmail = async (email) => {
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
    console.log(err);
    const error = new Error('FAIL_TO_GET_USERID');
    error.statusCode = 500;
    throw err;
  }
};

module.exports = {
  createUser,
  getHashedPassword,
  getUserIdByEmail,
  isUserIdExist,
};
