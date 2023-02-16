import * as Joi from 'joi';

export const validationSchema = Joi.object({
  MYSQL_ROOT_USER: Joi.string().required(),
  MYSQL_ROOT_PASSWORD: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_SCHEMA: Joi.string().required(),
});
