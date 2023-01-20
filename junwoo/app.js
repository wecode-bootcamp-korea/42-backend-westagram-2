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

app.post("/users/signup", async (req, res) => {
  const { name, email, age } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      age
      ) VALUES (?,?,?);
      `,
    [name, email, age]
  );

  res.status(201).json({ message: "userCreated" });
});

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
