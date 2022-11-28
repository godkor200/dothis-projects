module.exports = {
  apps: [
    {
      name: 'dothis-dev',
      script: './dist/apps/api/main.js',
      node_args: '-r ts-node/register -r tsconfig-paths/register',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: true,
      env: {
        TS_NODE_BASEURL: './dist',
        Server_PORT: 8080,
        NODE_ENV: 'development',
      },
    },
    // ,
    // {
    //   name: 'dothis-pd',
    //   script: './dist/apps/api/src/main.js',
    //   instances: 2, // 클러스터 모드
    //   autorestart: true,
    //   watch: true,
    //   env: {
    //     Server_PORT: 3000,
    //     NODE_ENV: 'production',
    //   },
    // },
  ],
};
