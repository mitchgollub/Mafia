import {InternalServerError, BadRequest} from '../../lib/error';
import res from '../../__mocks__/res';

test('InternalServerError returns 500 w/ error', async () => {
  const error = 500;

  const response = InternalServerError(res, error);

  expect(response.statusCode).toBe(error);
  expect(response.json.error).toEqual(error);
});

test('BadRequest returns 400 w/ error', async () => {
  const error = 400;

  const response = BadRequest(res, error);

  expect(response.statusCode).toBe(error);
  expect(response.json.error).toEqual(error);
});
