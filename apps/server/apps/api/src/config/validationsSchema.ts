import Joi from 'joi';

export const validationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  MYSQL_ROOT_USER: Joi.string().required(),
  MYSQL_ROOT_PASSWORD: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_SCHEMA: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_HOSTNAME: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
  AWS_CREDENTIAL_KEY: Joi.string().required(),
  AWS_CREDENTIAL_SECRET: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  NODE_ENV: Joi.string().required(),
  OPENSEARCH_NODE: Joi.string().required(),
});
