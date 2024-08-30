import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('opensearch', () => ({
  opensearch_node_one: process.env.OPENSEARCH_NODE,
  opensearch_node_two: process.env.OPENSEARCH_NODE_TWO,
  opensearch_node_three: process.env.OPENSEARCH_NODE_THREE,

  opensearch_id: process.env.OPENSEARCH_ID,
  opensearch_pw: process.env.OPENSEARCH_PW,
}));
