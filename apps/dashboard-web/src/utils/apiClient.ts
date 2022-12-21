import { Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';

import { apiBaseUrl } from '@/constants/dev';
import * as User from '@/domain/User';

export const apiClient = new Zodios(
  apiBaseUrl,
  // API definition
  [...User.api],
);

export const apiHooks = new ZodiosHooks('myAPI', apiClient);
