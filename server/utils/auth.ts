const jwt = require('jsonwebtoken');

// Need to create secret key
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  signToken: function ({
    email,
    username,
    _id,
  }: {
    email: string;
    username: string;
    _id: string;
  }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
