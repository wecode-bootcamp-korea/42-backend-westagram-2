// third-party module
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

appDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!!");
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan(""));

app.get("/ping", cors(), (req, res) => {
  res.json({ message: "pong" });
});

//과제 2번
app.post("/users/signup", async (req, res) => {
  const { password, name, email, age, profileImage } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
      password,
      name,
      email,
      age,
      profileImage
      ) VALUES (?,
        ?,
        ?,
        ?,
        ?);`,
    [password, name, email, age, profileImage]
  );
  res.status(201).json({ message: "userCreated" });
});

//과제 3번
app.post("/posts", async (req, res) => {
  const { title, content, image, user_id } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      image_url,
      user_id
    ) VALUES(
      ?,
      ?,
      ?,
      ?);`,
    [title, content, image, user_id]
  );

  res.status(201).json({ message: "postCreated" });
});

//과제 4번
app.get("/users/posts", async (req, res) => {
  await appDataSource.query(
    `SELECT
      u.id AS userId,
      u.profileImage AS userProfileImage,
      p.id AS postingId,
      p.image_url AS postingImageUrl,
      p.content AS postingContent
    FROM users u INNER JOIN posts p ON u.id = p.user_id`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

//과제 5번
app.get("/users/userPosts", async (req, res) => {
  await appDataSource.query(
    `SELECT
      u.id AS userId,
      u.profileImage AS userProfileImage,
      JSON_ARRAYAGG(JSON_OBJECT('postingId',p.id,'postingImgageUrl',p.image_url,'postingContent',p.content)) AS postings 
    FROM users u
    INNER JOIN posts p 
    ON u.id = p.user_id
    GROUP BY p.user_id
    `,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

//과제 6번
app.patch("/posts/modified", async (req, res) => {
  const { content } = req.body;
  await appDataSource.query(
    `UPDATE posts p, users u
    SET
      p.content = ?
      WHERE p.id = 1 AND u.id = 1
    `,
    [content]
  );

  await appDataSource.query(
    `SELECT
      u.id AS userID,
      u.name AS userName,
      p.id AS postingId,
      p.title AS postingTitle,
      p.content AS postingContent
      FROM users u
      INNER JOIN posts p ON u.id = 1 AND p.id = 1
    `,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});
//과제 7번
app.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  await appDataSource.query(
    `DELETE FROM posts
    WHERE posts.id = ${postId}
    `
  );
  res.status(200).json({ message: "postingDeleted" });
});

//과제 8번
app.post("/likes", async (req, res) => {
  const { post_id, user_id } = req.body;
  await appDataSource.query(
    `INSERT INTO likes(
      post_id,
      user_id
    ) VALUES(
      ?,
      ?);`,
    [post_id, user_id]
  );
  res.status(200).json({ message: "likeCreated" });
});

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
