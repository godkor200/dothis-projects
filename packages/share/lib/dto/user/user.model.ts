import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const zUser = extendApi(
  z.object({
    userId: extendApi(z.number(), {
      description: 'The id of user',
      type: 'number',
      nullable: false,
    }),
    userEmail: extendApi(z.string(), {
      description: 'user email',
      nullable: false,
      uniqueItems: true,
      maxLength: 30,
    }),
    channelId: extendApi(z.string(), {
      description: 'user channel-id',
      nullable: false,
      type: 'number',
      uniqueItems: true,
    }),
    tokenRefresh: extendApi(z.string(), {
      description: 'refresh token',
      nullable: true,
      maxLength: 110,
    }),
    tokenExpires: extendApi(z.number(), {
      description: 'token expiration time',
      nullable: true,
    }),
    tokenAccess: extendApi(z.string(), {
      description: 'access token',
      nullable: true,
      maxLength: 220,
    }),
    plan: extendApi(z.string(), {
      description: 'price plan',
      nullable: false,
    }),
    isAdmin: extendApi(z.boolean(), {
      description: 'Whether or not you are an administrator',
      default: false,
      nullable: false,
    }),
    status: extendApi(z.string(), {
      description: 'membership status',
      readOnly: true,
      nullable: true,
    }),
    dateSignIn: extendApi(z.date(), {
      description: 'The date which the user was created',
      readOnly: true,
      nullable: true,
    }),
  }),
  {
    title: 'User',
    description: 'A user schema',
  },
);

export class UserDto extends createZodDto(zUser) {}

export class CreateUserInput extends createZodDto(
  zUser.omit({
    dateSignIn: true,
  }),
) {}

export class UpdateUserInput extends createZodDto(
  zUser.omit({
    dateSignIn: true,
  }),
) {}
