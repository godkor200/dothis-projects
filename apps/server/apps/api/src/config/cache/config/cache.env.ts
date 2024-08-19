import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  local: {
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    hostname: process.env.REDIS_HOSTNAME ?? 'localhost',
    node: process.env.REDIS_NODE,
  },

  onPromise: {
    port: process.env.REDIS_ON_PROMISE_PORT,
    hostname: process.env.REDIS_ON_PROMISE_HOSTNAME ?? 'localhost',
    password: process.env.REDIS_ON_PROMISE_PASSWORD,
    node: process.env.REDIS_ON_PROMISE_NODE,
  },

  onPromise_db_2: {
    node: process.env.REDIS_ON_PROMISE_NODE_TWO,
  },

  ranking: {
    node: process.env.REDIS_RANKING_NODE,
  },
}));
