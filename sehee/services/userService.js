const userDao = require("../models/userDao"); // -->게시물 조회는 검증할게 없기 때문에 모듈만 불러오면 됨

const signUp = async (name, password, email, phoneNumber, profileImage) => {
  // // 정규표현식(REGEX)을 사용한 비밀번호 검증
  // const pwValidation = new RegExp(
  //   "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  // );

  // if (!pwValidation.test(password)) {
  //   const err = new Error("PASSWORD_IS_NOT_VALID");
  //   err.statusCode = 400;
  //   throw err;
  // }                                                           --> 아직 안 배움

  const createUser = await userDao.createUser(
    name,
    password,
    email,
    phoneNumber,
    profileImage
  );

  return createUser;
};

module.exports = {
  signUp,
};
