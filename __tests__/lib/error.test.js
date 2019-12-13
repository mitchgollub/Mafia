const Error = require('../../lib/error');

test('InternalServerError returns 500 w/ error', async () => {
    const res = {
            statusCode: 0,
            json: {},
            status: function (statusCode) {
                this.statusCode = statusCode
                return {
                    json: (object) => {
                        this.json = object
                    }
                }
            }
        }, 
        error = 500;

    const response = Error.InternalServerError(res, error);
    
    expect(response.statusCode).toBe(500);
    expect(response.json.error).toEqual(error);
});