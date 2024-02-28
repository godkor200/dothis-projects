import { registerAs } from '@nestjs/config';

export default registerAs('ignite', () => ({
  IGNITE_ENDPOINT1: process.env.IGNITE_ENDPOINT1,
  IGNITE_ENDPOINT2: process.env.IGNITE_ENDPOINT2,
  IGNITE_ENDPOINT3: process.env.IGNITE_ENDPOINT3,

  IGNITE_USER_NAME: process.env.IGNITE_USER_NAME,
  IGNITE_PASSWORD: process.env.IGNITE_PASSWORD,
}));
