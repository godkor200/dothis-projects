import { z } from 'zod';

export const zMembershipModel = z.object({
  id: z.number().nullable().describe('The ID of the membership.'),
  userId: z.number().describe('The ID of the user.'),
  subPrice: z.number().describe('The subscription price.'),
  subStatus: z.boolean().describe('The subscription status.'),
  subStart: z.date().describe('The start date of the subscription.'),
  subEnd: z.date().describe('The end date of the subscription.'),
  updateAt: z.date().describe('The update date.'),
  createdAt: z.date().describe('The creation date.'),
});
export type TMembershipModel = z.TypeOf<typeof zMembershipModel>;
