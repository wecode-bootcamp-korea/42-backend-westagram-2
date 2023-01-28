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

// 유저회원가입
const createUser = async (name, password, email, phoneNumber, profileImage) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
    name,
    password,
    email,
    phoneNumber,
    profileImage
    ) VALUES (?, ?, ?, ?, ?);
  `,
      [name, password, email, phoneNumber, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
};
