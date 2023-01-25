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

// 유저회원가입
app.post("/user/signup", async (req, res) => {
  const { name, password, email, phoneNumber, profileImage } = req.body;
  await appDataSource.query(
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
  res.status(201).json({ message: "userCreated" });
});

// 게시물 등록
app.post("/posting", async (req, res) => {
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

// 전체 게시글 조회
app.get("/posts/list", async (req, res) => {
  await appDataSource.query(
    `SELECT
    u.id AS usersId,
    u.profileImage AS userProfileImage,
    p.user_id AS posingId,
    p.post_image AS postingImageUrl,
    p.content AS postingContent
    FROM posts p INNER JOIN users u ON p.user_id = u.id; 
    `,
    (err, rows) => {
      res.status(200).json({ data: rows });
    }
  );
});

// 유저의 게시글 조회
app.get("/posts/list/:userId", async (req, res) => {
  const { userId } = req.params;
  await appDataSource.query(
    `SELECT
    u.id AS userId,
    u.profileImage AS userProfileImage,
    JSON_ARRAYAGG(
    JSON_OBJECT('postingId', p.id,
    'postingImageUrl', p.post_image, 'postingContent', p.content))
      AS postings
    FROM users u
    INNER JOIN posts p
    ON u.id=p.user_id WHERE u.id= ${userId};`,
    (err, rows) => {
      res.status(200).json({ data: rows });
    }
  );
});

// 게시글 수정
app.put("/posts/update/:postId", async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  await appDataSource.query(
    `UPDATE
    posts p
    SET p.content = ?
    WHERE p.id = ${postId};`,
    [content]
  );

  const updatePost = await appDataSource.query(
    `SELECT
    u.id AS userId, u.name AS userName, p.id AS postingId, p.title AS postingTitle, p.content AS postingContent
    FROM posts p
    INNER JOIN users u
    ON u.id=p.user_id
    WHERE p.id = ${postId}`
  );
  res.status(201).json({ data: updatePost });
});

// 게시글 삭제
app.delete("/posts/remove/:postId", async (req, res) => {
  const { postId } = req.params;
  await appDataSource.query(
    `DELETE FROM posts
    WHERE posts.id = ${postId};`
  );
  res.status(200).json({ message: "postingDeleted" }); //삭제 응답코드 : 204 NO Content
});

// 좋아요 누르기
app.post("/likes/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params;
  await appDataSource.query(
    `INSERT INTO likes (
      postId, userId
      )
      VALUES (?, ?);`,
    [postId, userId]
  );
  res.status(201).json({ message: "likeCreated" });
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
