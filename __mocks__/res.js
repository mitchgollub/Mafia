const res = {};

function handleStatusCode(statusCode) {
  this.statusCode = statusCode;
  return {
    json: (object) => {
      res.json = object;
    },
  };
}

res.status = handleStatusCode;
res.statusCode = 0;
res.json = {};

module.exports = res;
