import Joi from 'joi';

export const validationSchema = Joi.object({
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT를 위한 비밀 키, 안전한 통신을 위해 사용됩니다.'),
  MYSQL_ROOT_USER: Joi.string().description(
    'MySQL 데이터베이스의 루트 사용자 이름입니다.',
  ),
  MYSQL_ROOT_PASSWORD: Joi.string().description(
    'MySQL 데이터베이스의 루트 사용자 비밀번호입니다.',
  ),
  MYSQL_USER: Joi.string()
    .required()
    .description('MySQL 데이터베이스에 접속할 사용자의 이름입니다.'),
  MYSQL_PASSWORD: Joi.string()
    .required()
    .description('MySQL 데이터베이스 사용자의 비밀번호입니다.'),
  DB_PORT: Joi.number()
    .required()
    .description('데이터베이스 서버에 접속하기 위한 포트 번호입니다.'),
  DB_HOST: Joi.string()
    .required()
    .description('데이터베이스 서버의 호스트 주소입니다.'),
  DB_SCHEMA: Joi.string()
    .required()
    .description('사용할 데이터베이스의 스키마 이름입니다.'),
  APP_PORT: Joi.number()
    .required()
    .description('애플리케이션이 사용할 포트 번호입니다.'),
  REDIS_PORT: Joi.number()
    .required()
    .description('Redis 서버에 접속하기 위한 포트 번호입니다.'),
  REDIS_HOSTNAME: Joi.string()
    .required()
    .description('Redis 서버의 호스트 이름입니다.'),
  REDIS_PASSWORD: Joi.string()
    .required()
    .description('Redis 서버에 접속하기 위한 비밀번호입니다.'),
  REDIS_NODE: Joi.string()
    .required()
    .description('Redis 자동완성 서버의 접속할 node number 입니다.'),
  REDIS_RANKING_NODE: Joi.string()
    .required()
    .description('Redis on promise 서버의 접속할 node number 입니다.'),
  AWS_CREDENTIAL_KEY: Joi.string()
    .required()
    .description('AWS 서비스에 접속하기 위한 크레덴셜 키입니다.'),
  AWS_CREDENTIAL_SECRET: Joi.string()
    .required()
    .description('AWS 서비스의 접속을 위한 비밀 크레덴셜입니다.'),
  AWS_REGION: Joi.string()
    .required()
    .description('AWS 서비스를 사용할 리전을 명시합니다.'),
  NODE_ENV: Joi.string()
    .required()
    .description(
      '애플리케이션의 실행 환경을 명시합니다 (예: development, production).',
    ),
  OPENSEARCH_NODE: Joi.string()
    .required()
    .description('OpenSearch 클러스터의 노드 주소입니다.'),

  OPENSEARCH_NODE_TWO: Joi.string()
    .required()
    .description('OpenSearch 클러스터의 노드 주소입니다.'),

  OPENSEARCH_NODE_THREE: Joi.string()
    .required()
    .description('OpenSearch 클러스터의 노드 주소입니다.'),

  OPENSEARCH_ID: Joi.string()
    .required()
    .description('OpenSearch 클러스터의 사용자 정보 입니다.'),

  OPENSEARCH_PW: Joi.string()
    .required()
    .description('OpenSearch 클러스터의 사용자 정보 입니다.'),

  REDIS_ON_PROMISE_PORT: Joi.number().required(),
  REDIS_ON_PROMISE_HOSTNAME: Joi.string().description(
    'Redis on promise 서버의 호스트 이름입니다.',
  ),
  REDIS_ON_PROMISE_PASSWORD: Joi.string().description(
    'Redis on promise 서버의 패스워드 이름입니다.',
  ),
  REDIS_ON_PROMISE_USERNAME: Joi.string().description(
    'Redis on promise 서버의 접속할 사용자 이름입니다.',
  ),
  REDIS_ON_PROMISE_NODE: Joi.number()
    .required()
    .description('Redis on promise 서버의 접속할 node number 입니다.'),

  REDIS_ON_PROMISE_NODE_TWO: Joi.number()
    .required()
    .description('Redis on promise db 2 서버의 접속할 node number 입니다.'),
});
