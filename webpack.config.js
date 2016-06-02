var path = require('path');

module.exports = {
  entry: ['./src/polyfills.ts', './src/main.ts', 'webpack/hot/dev-server'],
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: [
      path.resolve('../angular/dist/all'),
      path.join(__dirname, "node_modules")
    ]
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      }
    ]
  },
  output: {
    path: './dist/app',
    filename: 'bundle.js'
  }
};
