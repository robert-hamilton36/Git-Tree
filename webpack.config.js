const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/content-script.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'content-script.js',
    path: path.resolve(__dirname),
  },
};