require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
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

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.post("/user/signup", async (req, res) => {
  const { name, password, email, phoneNumber } = req.body;
  await appDataSource.query(
    `INSERT INTO users(
    name,
    password,
    email,
    phoneNumber
    ) VALUES (?, ?, ?, ?);
  `,
    [name, password, email, phoneNumber]
  );
  res.status(201).json({ message: "userCreated" });
});

app.post("/post/posting", async (req, res) => {
  const { title, content, post_image, user_id } = req.body;
  console.log(title, content, post_image, user_id);
  await appDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      post_image,
      user_id
    ) VALUES (?, ?, ?, ?);
    `,
    [title, content, post_image, user_id]
  );
  res.status(201).json({ message: "postCreated" });
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
