"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zChannelData = void 0;
const zod_1 = require("zod");
exports.zChannelData = zod_1.z.object({
    id: zod_1.z.number(),
    userId: zod_1.z.number(),
    channelName: zod_1.z.string(),
    channelUrl: zod_1.z.string(),
    channelSubsciber: zod_1.z.number(),
    channelDescription: zod_1.z.string(),
    channelSince: zod_1.z.date(),
    channelTotalViews: zod_1.z.number(),
    channelTotalVideos: zod_1.z.number(),
    channelNormalVideos: zod_1.z.number(),
    channelCountry: zod_1.z.string(),
    channelLink: zod_1.z.string(),
});
//# sourceMappingURL=channel.model.js.map