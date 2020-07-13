import { NextApiResponse } from 'next';

function setStatus(
  res: NextApiResponse,
  code: number,
  message?: string,
): NextApiResponse {
  console.error(message);
  res.status(code).json({
    error: code,
    message: message,
  });
  return res;
}

export function InternalServerError(
  res: NextApiResponse,
  error: Error,
): NextApiResponse {
  console.error(error.stack);
  return setStatus(res, 500);
}
export function BadRequest(
  res: NextApiResponse,
  error: string,
): NextApiResponse {
  return setStatus(res, 400, `Bad Request: ${error}`);
}
