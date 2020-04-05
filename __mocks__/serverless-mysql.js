const mysql = jest.genMockFromModule('serverless-mysql');

let mockDbResponses = [];
let counter = 0;

// Can use JEST Mocks to manage function state
// https://jestjs.io/docs/en/es6-class-mocks
function setMockDbResonse(dbResponse) {
  mockDbResponses.push(dbResponse);
}

function clearMockDbResponse() {
  mockDbResponses = [];
  counter = 0;
}

async function query() {
  const mockDbResponse = mockDbResponses[counter];
  counter += 1;
  return mockDbResponse;
}

mysql.mockImplementation(() => mysql);
mysql.end = () => null;
mysql.setMockDbResonse = setMockDbResonse;
mysql.clearMockDbResponse = clearMockDbResponse;
mysql.query = query;

module.exports = mysql;
