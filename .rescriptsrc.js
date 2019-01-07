let path = require('path');
module.exports = {
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "@root": path.resolve(__dirname, 'src'),
        "@image": path.resolve(__dirname, 'src/image'),
        "@app": path.resolve(__dirname, 'src/Apps'),
        "@appComponents": path.resolve(__dirname, 'src/appComponents'),
        "@page": path.resolve(__dirname, 'src/containers/Page'),
        "@redux": path.resolve(__dirname, 'src/redux'),
        "@containers": path.resolve(__dirname, 'src/containers'),
        "@components": path.resolve(__dirname, 'src/components'),
        "@commons": path.resolve(__dirname, 'src/components/commons'),
        "@constants": path.resolve(__dirname, 'src/constants'),
        "@settings": path.resolve(__dirname, 'src/settings'),
        "@helpers": path.resolve(__dirname, 'src/helpers'),
        "@utils": path.resolve(__dirname, 'src/utils'),
        "@validations": path.resolve(__dirname, 'src/validations')
      }
    };
    return config;
  }
};
