"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var mongoose_1 = require("mongoose");
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/codeathon');
var db = mongoose_1.default.connection;
exports.db = db;
