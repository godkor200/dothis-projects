"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zUserChannelData = void 0;
const zod_1 = require("zod");
//TODO: zUserChannelData 정의하고 모든 db 프리머리키 id 마이그레이션
exports.zUserChannelData = zod_1.z.object({
    id: zod_1.z.string(),
});
//# sourceMappingURL=user-channel-data.model.js.map