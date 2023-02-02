const checkError = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res);
      next();
    } catch (err) {
      console.log('----에러 핸들러 작동----');
      console.error(err);
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  };
};

module.exports = {
  checkError,
};
