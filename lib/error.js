const Error = {}

exports.InternalServerError = (res,error) => {
  console.error(`ERROR: ${error}`)
  res.status(500).json({
    error: error
  })
  return res;
}
