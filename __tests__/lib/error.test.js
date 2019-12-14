const Error = require('../../lib/error');
const res = require('../../__mocks__/res');

test('InternalServerError returns 500 w/ error', async () => {
    const error = 500;

    const response = Error.InternalServerError(res, error);
    
    expect(response.statusCode).toBe(500);
    expect(response.json.error).toEqual(error);
});