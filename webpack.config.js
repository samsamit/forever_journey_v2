const path = require('path');

module.exports = {
  mode: 'development',
  target: 'webworker',
  entry: './DgraphLambdas/auth.js',
  output: {
    filename: 'LambdaBundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};