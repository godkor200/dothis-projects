import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  credential: {
    key: process.env.AWS_CREDENTIAL_KEY,
    secret: process.env.AWS_CREDENTIAL_SECRET,
  },
  region: process.env.AWS_REGION,
}));
