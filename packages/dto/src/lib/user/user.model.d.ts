import { z } from 'zod';
export declare const userModel: z.ZodObject<{
    id: z.ZodNullable<z.ZodNumber>;
    userEmail: z.ZodNullable<z.ZodString>;
    channelId: z.ZodNullable<z.ZodNumber>;
    tokenRefresh: z.ZodNullable<z.ZodString>;
    plan: z.ZodString;
    isAdmin: z.ZodNullable<z.ZodDefault<z.ZodBoolean>>;
    status: z.ZodNullable<z.ZodString>;
    dateSignIn: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id?: number;
    status?: string;
    userEmail?: string;
    channelId?: number;
    tokenRefresh?: string;
    plan?: string;
    isAdmin?: boolean;
    dateSignIn?: Date;
}, {
    id?: number;
    status?: string;
    userEmail?: string;
    channelId?: number;
    tokenRefresh?: string;
    plan?: string;
    isAdmin?: boolean;
    dateSignIn?: Date;
}>;
export type UserModel = z.TypeOf<typeof userModel>;
//# sourceMappingURL=user.model.d.ts.map