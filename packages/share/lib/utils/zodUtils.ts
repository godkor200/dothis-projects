import { z } from 'zod';

export const iterableToEnum = <K extends string>(
  enumObj: IterableIterator<K>,
) => { 
  const keys = [...enumObj];
  return z.enum(keys as [...[K]]);
};
