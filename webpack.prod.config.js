var path = require('path');

module.exports = {
  entry: ['./src/polyfills.ts', './src/prod.ts', './src/main.ts'],
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
    path: './dist',
    filename: 'bundle.js'
  },
  devtool: 'cheap-source-map'
};
