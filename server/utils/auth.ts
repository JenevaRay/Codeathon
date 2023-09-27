// const jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';

// Need to create secret key
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';


// we don't actually have usernames in our user table. 
const signToken = function ({
  email,
  nameFirst,
  nameLast,
  _id,
}: {
  email: string;
  nameFirst: string;
  nameLast: string;
  _id: string;
}) {
  const payload = {
    email,
    nameFirst,
    nameLast,
    _id,
  };
  const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  // console.log(token);
  return token;
};

export { signToken };
