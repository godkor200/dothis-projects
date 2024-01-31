require('dotenv').config({ path: '../../production.env' });
console.log(process.env.NODE_ENV);
module.exports = {
  apps: [
    {
      name: 'dothis',
      script: '../../dist/apps/api/main.js',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_memory_restart: '1G',
      watch: true,
      env_development: {
        APP_PORT: 8080,
        NODE_ENV: 'development',
        MYSQL_ROOT_USER: process.env.MYSQL_ROOT_USER,
        MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        DB_PORT: process.env.DB_PORT,
        DB_HOST: process.env.DB_HOST,
        DB_SCHEMA: process.env.DB_SCHEMA,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        JWT_SECRET: process.env.JWT_SECRET,
        ACCESS_TOKEN_EXPIRESIN: process.env.ACCESS_TOKEN_EXPIRESIN,
        REFRESH_TOKEN_EXPIRESIN: process.env.REFRESH_TOKEN_EXPIRESIN,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_HOSTNAME: process.env.REDIS_HOSTNAME,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        AWS_CREDENTIAL_KEY: process.env.AWS_CREDENTIAL_KEY,
        AWS_CREDENTIAL_SECRET: process.env.AWS_CREDENTIAL_SECRET,
        AWS_REGION: process.env.AWS_REGION,
        IGNITE_ENDPOINT: process.env.IGNITE_ENDPOINT,
        IGNITE_USER_NAME: process.env.IGNITE_USER_NAME,
        IGNITE_PASSWORD: process.env.IGNITE_PASSWORD,
      },
      env_production: {
        APP_PORT: 8080,
        NODE_ENV: 'production',
        MYSQL_ROOT_USER: process.env.MYSQL_ROOT_USER,
        MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        DB_PORT: process.env.DB_PORT,
        DB_HOST: process.env.DB_HOST,
        DB_SCHEMA: process.env.DB_SCHEMA,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        JWT_SECRET: process.env.JWT_SECRET,
        ACCESS_TOKEN_EXPIRESIN: process.env.ACCESS_TOKEN_EXPIRESIN,
        REFRESH_TOKEN_EXPIRESIN: process.env.REFRESH_TOKEN_EXPIRESIN,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_HOSTNAME: process.env.REDIS_HOSTNAME,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        AWS_CREDENTIAL_KEY: process.env.AWS_CREDENTIAL_KEY,
        AWS_CREDENTIAL_SECRET: process.env.AWS_CREDENTIAL_SECRET,
        AWS_REGION: process.env.AWS_REGION,
        OPENSEARCH_NODE: process.env.OPENSEARCH_NODE,
        IGNITE_ENDPOINT: process.env.IGNITE_ENDPOINT,
        IGNITE_USER_NAME: process.env.IGNITE_USER_NAME,
        IGNITE_PASSWORD: process.env.IGNITE_PASSWORD,
      },
    },
  ],
};
