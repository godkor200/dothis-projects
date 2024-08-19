import { zSearch } from './related-word.model';
import { z } from 'zod';

export const zRelatedWord = zSearch;
export const zWord = z.object({ word: z.string() });
