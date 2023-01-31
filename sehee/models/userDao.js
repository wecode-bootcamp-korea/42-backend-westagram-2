const { appDataSource } = require("./appDataSource");

// 유저회원가입
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
  const user = await appDataSource.query(
    `SELECT EXISTS(
      SELECT * FROM
      users id 
      WHERE
      id = ${userId}
    );`
  );
  const userExists = Object.values(user[0])[0];
  return userExists;
};

module.exports = {
  signUp,
  checkIfUserExistsOrNot,
};
