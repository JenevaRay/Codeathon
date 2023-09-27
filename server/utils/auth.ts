// const jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';

// Need to create secret key
const secret = process.env.SECRET_KEY || 'default-secret-key';
const expiration = '2h';


// we don't actually have usernames in our user table. 
const signToken = function ({
  email,
  // username,
  _id,
}: {
  email: string;
  // username: string;
  _id: string;
}) {
  const payload = {
    email,
    // username,
    _id,
  };
  const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  console.log(token);
  return token;
};

export { signToken };
