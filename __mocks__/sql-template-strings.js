'use strict';
const escape = jest.genMockFromModule('sql-template-strings');

escape.mockImplementation((text) => text);

module.exports = escape;