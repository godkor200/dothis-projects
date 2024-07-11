require('dotenv').config({ path: './production.env' });
console.log(process.env.NODE_ENV);
module.exports = {
  apps: [
    {
      name: 'dothis-external-sales-api',
      script: 'apps/server/dist/apps/external-sales-api/main.js',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_memory_restart: '1G',
      watch: true,
      env_development: {
        APP_PORT: 8081,
        NODE_ENV: 'development',
        MYSQL_ROOT_USER: process.env.MYSQL_ROOT_USER,
        MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        DB_PORT: process.env.DB_PORT,
        DB_HOST: process.env.DB_HOST,
        DB_SCHEMA: process.env.DB_SCHEMA,
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
      },
    },
  ],
};
