// set up module bundler which allows us to break up file
// entry point, where our application kicks off --> output

// import built in node function path
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      // use loader that was installed
      loader: 'babel-loader',
      // target files that end with .js with regex
      test: /\.js$/,
      exclude: /node_modules/
    }]
  }
};

