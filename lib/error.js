function setStatus(res, code, message) {
  console.error(message);
  res.status(code).json({
    error: code,
  });
  return res;
}

exports.InternalServerError = (res, error) => setStatus(res, 500, `Internal Server Error: ${error}`);
exports.BadRequest = (res, error) => setStatus(res, 400, `Bad Request: ${error}`);
