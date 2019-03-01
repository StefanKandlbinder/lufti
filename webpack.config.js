const stencil = require('@stencil/webpack');
var GitRevisionPlugin = require('git-revision-webpack-plugin');

module.exports = {
  plugins: [
    new GitRevisionPlugin()
  ]
}
