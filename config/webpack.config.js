const PATHS = require('./paths');
const parts = require('./webpack.parts');
const merge = require('webpack-merge');

const commonConfig = merge([
  parts.loadJavascript(),
  parts.loadStyles()
]);

const developmentConfig = merge([
  {
    entry: {
      main: ['babel-polyfill', 'react-hot-loader/patch', PATHS.dev ],
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [],
  },

  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),

  parts.HtmlWebpackPlugin()
]);

const productionConfig = merge([{
  entry: {
    main: PATHS.prod,
  },
  output: {
    path: PATHS.build,
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
}]);

module.exports = (env) => {
  if (env === 'production') {
    return merge([commonConfig, productionConfig]);
  }
  return merge([commonConfig, developmentConfig]);
};
