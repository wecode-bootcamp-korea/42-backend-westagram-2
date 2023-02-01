const { appDataSource } = require("./appDataSource");

const signUp = async (name, email, password, phoneNumber, profileImage) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        password,
        phoneNumber,
        profileImage
    ) VALUES (?, ?, ?, ?, ?);
  `,
      [name, email, password, phoneNumber, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const checkIfUserExistsOrNot = async (userId) => {
  try {
    const user = await appDataSource.query(
      `SELECT EXISTS(
      SELECT
      id
      FROM users 
      WHERE
      id = ${userId}
    );`
    );
    const userExists = Object.values(user[0])[0];
    return userExists;
  } catch (err) {
    const error = new Error("INVALID_DATA");
    error.statusCode = 500;
    throw error;
  }
};

const getUserInformation = async (email) => {
  const [result] = await appDataSource.query(
    `SELECT * FROM users
    WHERE 
    email = ?;`,
    [email]
  );
  return result;
};

module.exports = {
  signUp,
  checkIfUserExistsOrNot,
  getUserInformation,
};
