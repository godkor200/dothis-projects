import { registerAs } from '@nestjs/config';

export default registerAs('ignite', () => ({
  IGNITE_ENDPOINT: process.env.IGNITE_ENDPOINT,
  IGNITE_USER_NAME: process.env.IGNITE_USER_NAME,
  IGNITE_PASSWORD: process.env.IGNITE_PASSWORD,
}));
