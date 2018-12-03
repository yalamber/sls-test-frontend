const npm_package = require('./package.json')

module.exports = function override(config, env) {
  if (env === 'production') {
    config.devtool = false;
  }
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
    }
  }
  return config;
};
