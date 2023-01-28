const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userController.signUp); //내가 설정한 경로로 작성, 앞에 index에서 받아온 user가 붙어 있음

module.exports = {
  router,
};
