require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

appDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('short'));


// health check 
app.get("/ping", (req, res) => {
  res.json({ message : "pong" })
});

// 유저 회원가입 
app.post("/signup", async (req, res) => {
  const { username, email, profileImage , password } = req.body

  await appDataSource.query(
    `INSERT INTO users (
      username, 
      email, 
      profile_image,
      password
    ) VALUES (?, ?, ?, ?);
    `,
    [username, email, profileImage, password]
  );

  res.status(201).json({ message : "userCreated"})
})

// 게시물 등록
app.post("/post/post-write", async (req, res) => {
  const { postImage, content, userId } = req.body;

  await appDataSource.query(
    `INSERT INTO posts (
      post_image,
      content,
      user_id
    ) VALUES (?, ?, ?);
    `,
    [postImage, content, userId]
  );

  res.status(201).json({ message : "postCreated" });
});

// 전체 게시물 조회

app.get("/post/lists", async (req, res) => {

  const postList = await appDataSource.query(
    `SELECT 
        users.id AS userId, 
        users.profile_image AS userProfileImage,
        posts.id AS postingId,
        posts.post_image AS postingImageUrl,
        posts.content AS postingContent
      FROM posts
      INNER JOIN users ON users.id = posts.user_id;
    `
  );

  res.status(200).json({ data : postList })
});

// 유저의 게시물 조회
app.get("/user/:userId/posts", async (req, res) => {

  const { userId } = req.params;
  const userPosts = await appDataSource.query(
    `SELECT 
        users.id AS userId, 
        users.profile_image AS userProfileImage,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "postingId", posts.id,
            "postingImageUrl", posts.post_image,
            "postingContent", posts.content
          ) 
        ) AS postings
        FROM posts
      INNER JOIN users ON users.id = posts.user_id
      WHERE users.id = ?
      GROUP BY users.id;
    `, [userId]
  );

  res.status(200).json({ data : userPosts })
});

  // 게시물 수정
  app.patch("/post/:postId/edit", async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    await appDataSource.query(
      `UPDATE posts
        SET content = ?
        WHERE id = ?;
      `,
      [content, postId]
    )

    const updatedPost = await appDataSource.query(
      `SELECT 
        users.id AS userId,
        users.username AS username,
        posts.id AS postingId,
        posts.title AS postingTitle,
        posts.content AS postingContent
      FROM posts
      INNER JOIN users ON users.id = posts.user_id
      WHERE posts.id = ?;
      `,
      [postId]
    )

  res.status(200).json({ data : updatedPost })
  })

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
}

start();