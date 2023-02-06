import { makeApi, makeEndpoint } from '@zodios/core';
import { z } from 'zod';

// export const schema = z.object({
//   id: z.string(),
//   name: z.string(),
//   profileImage: z.string(),
// });
//
// export const getUser = makeEndpoint({
//   method: 'get',
//   path: '/user/:id',
//   alias: 'getUser',
//   description: 'Get a user',
//   response: schema,
// });
// export const getUsers = makeEndpoint({
//   method: 'get',
//   path: '/users',
//   alias: 'getUsers',
//   description: 'Get a users',
//   response: z.array(schema),
// });
//
// export const api = makeApi([getUser, getUsers]);
