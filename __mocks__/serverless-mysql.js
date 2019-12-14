'use strict';
const mysql = jest.genMockFromModule('serverless-mysql');

let mockDbResponses = [];
function __setMockDbResonse(dbResponse) {
    mockDbResponses.push(dbResponse);
}

async function query(query) {
    const mockDbResponse = mockDbResponses[0];
    mockDbResponses.splice(0, 1);
    return mockDbResponse;
}

mysql.mockImplementation(() => mysql);
mysql.end = () => null;
mysql.__setMockDbResonse = __setMockDbResonse;
mysql.query = query;

module.exports = mysql;