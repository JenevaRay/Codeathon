import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.SECRET_KEY!;
const expiration = '24h';

const signToken = function ({
  _id,
  emailAddress,
  nameLast,
  nameFirst,
}: {
  _id: string;
  emailAddress: string;
  nameLast: string;
  nameFirst: string;
}) {
  const payload = {
    _id,
    emailAddress,
    nameLast,
    nameFirst,
  };
  const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  return token;
};

export { signToken };
