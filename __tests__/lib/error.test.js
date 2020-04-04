const Error = require('../../lib/error');
const res = require('../../__mocks__/res');

test('InternalServerError returns 500 w/ error', async () => {
    const error = 500;

    const response = Error.InternalServerError(res, error);
    
    expect(response.statusCode).toBe(error);
    expect(response.json.error).toEqual(error);
});

test('BadRequest returns 400 w/ error', async () => {
    const error = 400;

    const response = Error.BadRequest(res, error);
    
    expect(response.statusCode).toBe(error);
    expect(response.json.error).toEqual(error);
});