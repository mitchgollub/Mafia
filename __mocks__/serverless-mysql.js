'use strict';
const mysql = jest.genMockFromModule('serverless-mysql');

let mockDbResponse = {};
function __setMockDbResonse(dbResponse) { mockDbResponse = dbResponse; }

async function query(query) {
    return mockDbResponse;
}


mysql.mockImplementation(() => mysql);
mysql.end = () => null;
mysql.__setMockDbResonse = __setMockDbResonse;
mysql.query = query;

module.exports = mysql;