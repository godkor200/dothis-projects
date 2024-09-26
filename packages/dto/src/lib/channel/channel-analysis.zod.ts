import { z } from 'zod';

export const zChannelAnalysisBody = z.object({
  registeredChannelId: z.string(),
});
