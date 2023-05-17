import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  title: string;
  content: string;
};

export const MessageInput = (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const result: Data = {
    title: `id: ${req.query.id}, authorization header: ${req.headers.authorization}`,
    content: `body[test]: ${req.body['test']}, cookie[test]: ${req.cookies.test}`,
  };
  res.status(200).send(result);
};
