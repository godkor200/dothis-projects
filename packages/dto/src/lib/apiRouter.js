"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const contract_1 = require("./contract");
const user_1 = require("./user");
const auth_1 = require("./auth");
exports.apiRouter = contract_1.c.router({
    auth: auth_1.authApi,
    user: user_1.userApi,
});
//# sourceMappingURL=apiRouter.js.map