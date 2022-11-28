module.exports = {
  apps: [
    {
      name: 'dothis-dev',
      script: './apps/api/src/main.js',
      instances: 2,
      autorestart: true,
      watch: true,
      env: {
        Server_PORT: 3000, //Express PORT
        NODE_ENV: 'development',
      },
    },
    {
      name: 'dothis-pd',
      script: './apps/api/src/main.js',
      instances: 2, // 클러스터 모드
      autorestart: true,
      watch: true,
      env: {
        Server_PORT: 3000,
        NODE_ENV: 'production',
      },
    },
  ],
};
