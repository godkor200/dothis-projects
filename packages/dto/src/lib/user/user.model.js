"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const zod_1 = require("zod");
exports.userModel = zod_1.z.object({
    id: zod_1.z.number().nullable().describe('The id of user'),
    userEmail: zod_1.z.string().email().max(30).nullable().describe('user email'),
    channelId: zod_1.z.number().nullable().describe('User Channel-id'),
    tokenRefresh: zod_1.z.string().max(110).nullable().describe('refresh token'),
    plan: zod_1.z.string().max(10).describe('price plan'),
    isAdmin: zod_1.z
        .boolean()
        .default(false)
        .nullable()
        .describe('Whether or not you are an administrator'),
    status: zod_1.z.string().nullable().describe('membership status'),
    dateSignIn: zod_1.z
        .date()
        .nullable()
        .describe('The date which the user was created'),
});
//# sourceMappingURL=user.model.js.map