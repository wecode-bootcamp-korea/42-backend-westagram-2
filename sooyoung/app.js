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
  const { username, email, password } = req.body

  await appDataSource.query(
    `INSERT INTO users (
      username, 
      email, 
      password
    ) VALUES (?, ?, ?);
    `,
    [username, email, password]
  );

  res.status(201).json({ message : "userCreated"})
})

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
}

start();