'use strict';
const mysql = jest.genMockFromModule('serverless-mysql');

let mockDbResponses = [];
let counter = 0;

// Can use JEST Mocks to manage function state
// https://jestjs.io/docs/en/es6-class-mocks
function __setMockDbResonse(dbResponse) {
    mockDbResponses.push(dbResponse);
}

function __clearMockDbResponse() {
    mockDbResponses = [];
    counter = 0;
}

async function query(query) {
    const mockDbResponse = mockDbResponses[counter];
    counter++; 
    return mockDbResponse;
}

mysql.mockImplementation(() => mysql);
mysql.end = () => null;
mysql.__setMockDbResonse = __setMockDbResonse;
mysql.__clearMockDbResponse = __clearMockDbResponse;
mysql.query = query;

module.exports = mysql;