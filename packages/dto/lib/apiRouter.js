"use strict";
exports.__esModule = true;
exports.apiRouter = void 0;
var contract_1 = require("./contract");
var user_1 = require("./user");
var auth_1 = require("./auth");
exports.apiRouter = contract_1.c.router({
    auth: auth_1.authApi,
    user: user_1.userApi
});
