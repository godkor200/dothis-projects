import { z } from 'zod';
export declare const zChannelData: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    channelName: z.ZodString;
    channelUrl: z.ZodString;
    channelSubsciber: z.ZodNumber;
    channelDescription: z.ZodString;
    channelSince: z.ZodDate;
    channelTotalViews: z.ZodNumber;
    channelTotalVideos: z.ZodNumber;
    channelNormalVideos: z.ZodNumber;
    channelCountry: z.ZodString;
    channelLink: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: number;
    userId?: number;
    channelName?: string;
    channelUrl?: string;
    channelSubsciber?: number;
    channelDescription?: string;
    channelSince?: Date;
    channelTotalViews?: number;
    channelTotalVideos?: number;
    channelNormalVideos?: number;
    channelCountry?: string;
    channelLink?: string;
}, {
    id?: number;
    userId?: number;
    channelName?: string;
    channelUrl?: string;
    channelSubsciber?: number;
    channelDescription?: string;
    channelSince?: Date;
    channelTotalViews?: number;
    channelTotalVideos?: number;
    channelNormalVideos?: number;
    channelCountry?: string;
    channelLink?: string;
}>;
export type ChannelModel = z.TypeOf<typeof zChannelData>;
//# sourceMappingURL=channel.model.d.ts.map