
exports.sendError = (res, error, statusCode = 200) => {
  res.status(statusCode).json({ error });
};

