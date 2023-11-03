import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('aws', () => ({
  credential: {
    key: process.env.AWS_CREDENTIAL_KEY,
    secret: process.env.AWS_CREDENTIAL_SECRET,
  },
  region: process.env.AWS_REGION,
  OPENSEARCH_NODE: process.env.OPENSEARCH_NODE,
}));
