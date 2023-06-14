const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const lazyImports = [
  // '@nestjs/microservices',
  // 'cache-manager',
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets/socket-module',
  'class-transformer/storage', // https://github.com/nestjs/mapped-types/issues/486#issuecomment-932715880
  'class-validator',
  'class-transformer',
];

module.exports = function (options, webpack) {
  if (process.env.NODE_ENV === 'production') {
    options.devtool = 'source-map';
    options.entry = {};
    options.optimization.minimize = true;
    options.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ];
  } else if (process.env.NODE_ENV === 'development') {
    Object.keys(options.entry).forEach(
      (key) =>
        (options.entry[key] = ['webpack/hot/poll?100', options.entry[key]]),
    );
    options.plugins = [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: 'main.js',
      }),
    ];
  }

  return {
    ...options,
    output: {
      filename: `[name].js`,
      path: path.join(__dirname, '../../dist/apps/api'),
    },
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    // module: {
    //   rules: [
    //     {
    //       test: /.ts?$/,
    //       use: [
    //         {
    //           loader: 'ts-loader',
    //           options: {
    //             transpileOnly: true,
    //             configFile: tsConfigFile,
    //           },
    //         },
    //       ],
    //       exclude: /node_modules/,
    //     },
    //   ],
    // },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: tsConfigFile,
        }),
      ],
    },
    plugins: [
      ...options.plugins,
      new webpack.ProgressPlugin(),
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource, {
              paths: [process.cwd()],
            });
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
      new CleanWebpackPlugin(),
    ],
  };
};
