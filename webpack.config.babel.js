import * as path from 'path';

import webpack from 'webpack';
import SystemBellPlugin from 'system-bell-webpack-plugin';
import merge from 'webpack-merge';

const ROOT_PATH = __dirname;
const config = {
  paths: {
    dist: path.join(ROOT_PATH, 'dist'),
    src: path.join(ROOT_PATH, 'src'),
    docs: path.join(ROOT_PATH, 'docs'),
    ghPages: path.join(ROOT_PATH, 'gh-pages'),
  },
  filename: 'index',
  library: 'Boilerplate',
};

const common = {
  resolve: {
    extensions: ['.js', '.css', '.png', '.jpg'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: 'eslint-loader',
        include: [
          config.paths.docs,
          config.paths.src,
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: [
    new SystemBellPlugin(),
  ],
};

const distCommon = {
  devtool: 'source-map',
  output: {
    path: config.paths.dist,
    libraryTarget: 'umd',
    library: config.library,
  },
  entry: config.paths.src,
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: config.paths.src,
      },
    ],
  },
  plugins: [
    new SystemBellPlugin(),
  ],
};

const dist = merge(distCommon, {
  output: {
    filename: `${config.filename}.js`,
  },
});

const distMin = merge(distCommon, {
  output: {
    filename: `${config.filename}.min.js`,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
});

module.exports = (env) => {
  process.env.BABEL_ENV = env;

  const targets = {
    dist,
    distMin,
  };

  return targets[env] ? targets[env] : common;
};
