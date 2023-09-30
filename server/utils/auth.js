"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = void 0;
var dotenv = require("dotenv");
var jwt = require("jsonwebtoken");
dotenv.config();
var secret = process.env.SECRET_KEY || "thereisnopassword";
var expiration = '24h';
var signToken = function (_a) {
    var _id = _a._id, emailAddress = _a.emailAddress, nameLast = _a.nameLast, nameFirst = _a.nameFirst;
    var payload = {
        _id: _id,
        emailAddress: emailAddress,
        nameLast: nameLast,
        nameFirst: nameFirst,
    };
    var token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    return token;
};
exports.signToken = signToken;
