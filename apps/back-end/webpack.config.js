const path = require('path');

// Documentation:
// https://docs.nestjs.com/faq/serverless#serverless
// https://github.com/nestjs/swagger/issues/1334#issuecomment-836488125

// Tell webpack to ignore specific imports that aren't
// used by our Lambda but imported by NestJS (can cause packing errors).
const lazyImports = [
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets/socket-module',
  '@nestjs/platform-express',
  'class-transformer/storage', // https://github.com/nestjs/mapped-types/issues/486#issuecomment-932715880
];

module.exports = (options, webpack) => ({
  ...options,
  mode: 'production',
  target: 'node14',
  entry: {
    index: './lib/lambda.js',
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    path: path.join(process.cwd(), 'build/dist'),
  },
  externals: {
    'aws-sdk': 'aws-sdk',
  },
  plugins: [
    ...options.plugins,
    new webpack.IgnorePlugin({
      checkResource(resource) {
        if (lazyImports.includes(resource)) {
          try {
            require.resolve(resource);
          } catch (err) {
            return true;
          }
        }
        return false;
      },
    }),
  ],
});
