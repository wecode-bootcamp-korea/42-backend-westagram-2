// 경로 작성
const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
router.use("/user", userRouter.router);

const postsRouter = require("./postsRouter");
router.use("/posts", postsRouter.router);

const likesRouter = require("./likesRouter");
router.use("/likes", likesRouter.router);

module.exports = router;
